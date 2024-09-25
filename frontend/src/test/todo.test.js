// backend/test/todo.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const app = require('../../../backend/server'); // Adjust path if necessary
const Todo = require('../../../backend/models/Todo'); // Adjust path if necessary
const { expect } = chai;

chai.use(chaiHttp);

describe('Todo API', () => {
  // Connect to the database before tests
  before((done) => {
    mongoose.connect('mongodb+srv://admin:0754092850@todoapp.aqby3.mongodb.net/test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }, (err) => {
      if (err) console.error(err);
      else done();
    });
  });

  // Clear the database before each test
  beforeEach(async () => {
    await Todo.deleteMany({});
  });

  // Close the database connection after tests
  after((done) => {
    mongoose.connection.close();
    done();
  });

  // Test POST /addTodoList (Add new todo)
  it('should add a new todo', (done) => {
    const todo = { task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' };
    chai.request(app)
      .post('/addTodoList')
      .send(todo)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('task').eql('Test Todo');
        expect(res.body).to.have.property('status').eql('incomplete');
        expect(res.body).to.have.property('deadline').eql('2024-09-30');
        done();
      });
  });

  // Test GET /getTodoList (Fetch all todos)
  it('should get all todos', (done) => {
    const todo = new Todo({ task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' });
    todo.save().then(() => {
      chai.request(app)
        .get('/getTodoList')
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('array').that.is.not.empty;
          done();
        });
    });
  });

  // Test POST /updateTodoList/:id (Update a todo)
  it('should update a todo', (done) => {
    const todo = new Todo({ task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' });
    todo.save().then((savedTodo) => {
      chai.request(app)
        .post(`/updateTodoList/${savedTodo._id}`)
        .send({ task: 'Updated Todo', status: 'complete', deadline: '2024-10-01' })
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('task').eql('Updated Todo');
          expect(res.body).to.have.property('status').eql('complete');
          done();
        });
    });
  });

  // Test DELETE /deleteTodoList/:id (Delete a todo)
  it('should delete a todo', (done) => {
    const todo = new Todo({ task: 'Test Todo', status: 'incomplete', deadline: '2024-09-30' });
    todo.save().then((savedTodo) => {
      chai.request(app)
        .delete(`/deleteTodoList/${savedTodo._id}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('task').eql('Test Todo');
          done();
        });
    });
  });
});
