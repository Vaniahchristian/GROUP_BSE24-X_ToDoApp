import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Todo from "../components/Todo"; // Adjust the import path as necessary
import axios from 'axios';

// Mocking axios to avoid actual API calls during tests
jest.mock('axios');

describe("Todo Component", () => {
  beforeEach(() => {
    // Mocking the API response for the getTodoList call
    axios.get.mockResolvedValue({ data: [{ _id: '1', task: 'Test Task', status: 'Pending', deadline: '2024-12-31T12:00:00Z' }] });
  });

  test("always passes", () => {
    expect(true).toBe(true);
  });

  test("renders without crashing", () => {
    render(<Todo />);
  });

  test("displays the correct title", () => {
    render(<Todo />);
    const titleElement = screen.getByText(/Todo List/i);
    expect(titleElement).toBeInTheDocument(); // Checks if the title is rendered
  });

  test("renders a task from the todo list", () => {
    render(<Todo />);
    const taskElement = screen.getByText(/Test Task/i);
    expect(taskElement).toBeInTheDocument(); // Checks if the test task is rendered
  });

  test("allows user to input a new task", () => {
    render(<Todo />);

    // Input the new task
    fireEvent.change(screen.getByPlaceholderText(/Enter Task/i), {
      target: { value: 'New Task' },
    });

    // Input the new status
    fireEvent.change(screen.getByPlaceholderText(/Enter Status/i), {
      target: { value: 'In Progress' },
    });

    // Input the new deadline
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: '2024-12-31T12:00' },
    });

    // Check if the inputs contain the correct values
    expect(screen.getByPlaceholderText(/Enter Task/i).value).toBe('New Task');
    expect(screen.getByPlaceholderText(/Enter Status/i).value).toBe('In Progress');
    expect(screen.getByLabelText(/Deadline/i).value).toBe('2024-12-31T12:00');
  });

  test("submits a new task", () => {
    render(<Todo />);

    // Input the new task
    fireEvent.change(screen.getByPlaceholderText(/Enter Task/i), {
      target: { value: 'New Task' },
    });

    // Input the new status
    fireEvent.change(screen.getByPlaceholderText(/Enter Status/i), {
      target: { value: 'In Progress' },
    });

    // Input the new deadline
    fireEvent.change(screen.getByLabelText(/Deadline/i), {
      target: { value: '2024-12-31T12:00' },
    });

    // Mocking the post response
    axios.post.mockResolvedValue({ data: { success: true } });

    // Click the add task button
    fireEvent.click(screen.getByText(/Add Task/i));

    // Optionally, you could check that the API was called
    expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/addTodoList', {
      task: 'New Task',
      status: 'In Progress',
      deadline: '2024-12-31T12:00',
    });
  });
});
