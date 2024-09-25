// Todo.test.js
const React = require('react');
const { render, screen, fireEvent, waitFor } = require('@testing-library/react');
const Todo = require('../components/Todo');
const axios = require('axios');
const sinon = require('sinon');

// Mocking axios
sinon.stub(axios, 'get').returns(Promise.resolve({ data: todoItems }));
sinon.stub(axios, 'post').returns(Promise.resolve({ data: { task: 'New Task', status: 'Pending', deadline: '2024-09-30T12:00:00Z' } }));
sinon.stub(axios, 'delete').returns(Promise.resolve({ data: {} }));

describe('Todo Component', () => {
    const todoItems = [
        { _id: '1', task: 'Task 1', status: 'Pending', deadline: '2024-09-30T12:00:00Z' },
        { _id: '2', task: 'Task 2', status: 'Completed', deadline: '2024-09-30T12:00:00Z' },
    ];

    beforeEach(() => {
        axios.get.resolves({ data: todoItems });
    });

    afterEach(() => {
        sinon.restore(); // Restore original methods after each test
    });

    it('renders Todo component and fetches todo list', async () => {
        render(<Todo />);
        expect(screen.getByText(/Todo List/i)).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
            expect(screen.getByText('Task 2')).toBeInTheDocument();
        });
    });

    it('allows adding a new task', async () => {
        render(<Todo />);

        // Add new task
        fireEvent.change(screen.getByPlaceholderText(/Enter Task/i), { target: { value: 'New Task' } });
        fireEvent.change(screen.getByPlaceholderText(/Enter Status/i), { target: { value: 'Pending' } });
        fireEvent.change(screen.getByLabelText(/Deadline/i), { target: { value: '2024-09-30T12:00:00Z' } });

        fireEvent.click(screen.getByText(/Add Task/i));

        await waitFor(() => {
            expect(screen.getByText('New Task')).toBeInTheDocument();
        });
    });

    it('allows editing a task', async () => {
        render(<Todo />);

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText(/Edit/i)[0]);

        fireEvent.change(screen.getByDisplayValue('Task 1'), { target: { value: 'Updated Task' } });
        fireEvent.change(screen.getByDisplayValue('Pending'), { target: { value: 'In Progress' } });
        fireEvent.change(screen.getByDisplayValue('2024-09-30T12:00:00Z'), { target: { value: '2024-10-01T12:00:00Z' } });

        fireEvent.click(screen.getByText(/Save/i));

        await waitFor(() => {
            expect(screen.getByText('Updated Task')).toBeInTheDocument();
        });
    });

    it('allows deleting a task', async () => {
        render(<Todo />);

        await waitFor(() => {
            expect(screen.getByText('Task 1')).toBeInTheDocument();
        });

        fireEvent.click(screen.getAllByText(/Delete/i)[0]);

        await waitFor(() => {
            expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
        });
    });
});
