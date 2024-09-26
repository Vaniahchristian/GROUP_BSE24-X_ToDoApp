// Create an async IIFE to handle dynamic imports
(async () => {
  const chai = await import('chai');
  const chaiHttp = await import('chai-http');
  const mongoose = await import('mongoose');
  const app = await import('../server'); // Adjust path if necessary
  const Todo = await import('../models/Todo'); // Adjust path if necessary

  const { expect } = chai;
  chai.use(chaiHttp.default); // Accessing the default export

  describe('Todo API', () => {
    // Connect to the database before tests
    before(async () => {
      await mongoose.default.connect('mongodb+srv://admin:0754092850@todoapp.aqby3.mongodb.net/test', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });

    // Clear the database before each test
    beforeEach(async () => {
      await Todo.default.deleteMany({});
    });

    // Close the database connection after tests
    after(async () => {
      await mongoose.default.connection.close();
    });

    // Test POST /addTodoList (Add new todo)
    it('should add a new todo', async () => {
      const todo = { task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' };
      const res = await chai.request(app.default)
        .post('/addTodoList')
        .send(todo);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('task').eql('Test Todo');
      expect(res.body).to.have.property('status').eql('incomplete');
      expect(res.body).to.have.property('deadline').eql('2024-09-30');
    });

    // Test GET /getTodoList (Fetch all todos)
    it('should get all todos', async () => {
      const todo = new Todo.default({ task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' });
      await todo.save();

      const res = await chai.request(app.default)
        .get('/getTodoList');

      expect(res).to.have.status(200);
      expect(res.body).to.be.an('array').that.is.not.empty;
    });

    // Test POST /updateTodoList/:id (Update a todo)
    it('should update a todo', async () => {
      const todo = new Todo.default({ task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' });
      const savedTodo = await todo.save();

      const res = await chai.request(app.default)
        .post(`/updateTodoList/${savedTodo._id}`)
        .send({ task: 'Updated Todo', status: 'complete', deadline: '2024-10-01' });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('task').eql('Updated Todo');
      expect(res.body).to.have.property('status').eql('complete');
    });

    // Test DELETE /deleteTodoList/:id (Delete a todo)
    it('should delete a todo', async () => {
      const todo = new Todo.default({ task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' });
      const savedTodo = await todo.save();

      const res = await chai.request(app.default)
        .delete(`/deleteTodoList/${savedTodo._id}`);

      expect(res).to.have.status(200);
      expect(res.body).to.have.property('task').eql('Test Todo');
    });
  });
})();
