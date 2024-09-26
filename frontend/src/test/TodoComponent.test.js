import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import Todo from '../components/Todo';

jest.mock('axios');

describe('Todo Component', () => {
  const mockTodoList = [
    { _id: '1', task: 'Task 1', status: 'Pending', deadline: '2024-09-26T10:00:00' },
    { _id: '2', task: 'Task 2', status: 'Completed', deadline: '2024-09-27T14:00:00' },
  ];

  // Suppress console errors
  const originalError = console.error;
  beforeAll(() => {
    console.error = jest.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockTodoList });
    axios.post.mockResolvedValue({});
    axios.delete.mockResolvedValue({});
  });
     

   test("renders without crashing", () => {
    render(<Todo />);
    });
  

  test('edits a task', async () => {
    render(<Todo />);
    await waitFor(() => {
      const editButtons = screen.getAllByText('Edit');
      fireEvent.click(editButtons[0]);
    });

    const taskInput = screen.getByDisplayValue('Task 1');
    fireEvent.change(taskInput, { target: { value: 'Updated Task 1' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/updateTodoList/1', expect.any(Object));
    });
  });

  test('deletes a task', async () => {
    render(<Todo />);
    await waitFor(() => {
      const deleteButtons = screen.getAllByText('Delete');
      fireEvent.click(deleteButtons[0]);
    });

    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith('http://localhost:3001/deleteTodoList/1');
    });
  });

  test('displays error when adding task with empty fields', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Todo />);

    const addButton = screen.getByRole('button', { name: /Add Task/i });
    fireEvent.click(addButton);

    expect(alertMock).toHaveBeenCalledWith('All fields must be filled out.');
    alertMock.mockRestore();
  });

  test('displays error when saving edited task with empty fields', async () => {
    const alertMock = jest.spyOn(window, 'alert').mockImplementation(() => {});
    render(<Todo />);
    
    await waitFor(() => {
      const editButtons = screen.getAllByText('Edit');
      fireEvent.click(editButtons[0]);
    });

    const taskInput = screen.getByDisplayValue('Task 1');
    fireEvent.change(taskInput, { target: { value: '' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(alertMock).toHaveBeenCalledWith('All fields must be filled out.');
    alertMock.mockRestore();
  });
});