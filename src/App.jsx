import { useState, useEffect, useRef } from 'react';
import './App.css';

const today = new Date().toISOString().split('T')[0];

function App() {
  const [todo, setData] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [userPriority, setUserPriority] = useState(0);
  const [userDate, setUserDate] = useState(today);

  const [message_val, setMessageVal] = useState(false);
  const [newIndex, setnewIndex] = useState(0);

  const [editval, setEditval] = useState(false);
  const [editval2, setEditval2] = useState(false);
  const [newelement, setNewelement] = useState('');
  const [newePriority, setNewePriority] = useState('');
  const [newDate, setNewDate] = useState(today);

  const [mainbox_val, setMainboxeVal] = useState('all');

  const [countTodo, setcountTodo] = useState({
    countAll: 0,
    countComplete: 0,
    countUnComplete: 0,
  });

  const task_name_ref = useRef();
  const task_priority_ref = useRef();
  const task_date_ref = useRef();
  const message2_text_ref = useRef();
  const message2_priority_ref = useRef();
  const message2_date_ref = useRef();
  const mainbox_ref = useRef();
  const headline_ref = useRef();

  useEffect(() => {
    countFunction();
    task_name_ref.current.focus();
  }, [todo]);

  const onPush = e => {
    setUserInput(e.target.value);
  };

  const onPush2 = e => {
    setUserPriority(e.target.value);
  };

  const onPush3 = e => {
    setUserDate(e.target.value);
  };

  const onFistKeyDown = e => {
    if (e.key == 'Enter' && userInput) {
      task_priority_ref.current.focus();
    }
  };

  const onSecondKeyDown = e => {
    if (e.key == 'Enter' && userPriority > 0) {
      task_date_ref.current.focus();
    }
  };

  const onThirdKeyDown = e => {
    if (e.key == 'Enter') {
      onAdd();
      task_priority_ref.current.value = '';
    }
  };

  const onAdd = () => {
    if (userInput)
      setData([
        ...todo,
        {
          isCompleted: false,
          text: userInput,
          priority: userPriority,
          date: userDate,
        },
      ]);
    setUserInput('');
    setUserPriority(0);
    setUserDate(today);
    task_date_ref.current.value = today;
  };

  const onMessage = index => {
    setMessageVal(true);
    setnewIndex(index);
  };

  const onDelete = index => {
    const todCopy = [...todo];
    todCopy.splice(index, 1);
    setData(todCopy);
    setMessageVal(false);
  };

  const onEditbox = index => {
    setnewIndex(index);
    const copytodo = { ...todo[index] };
    console.log(copytodo);
    setNewelement(copytodo.text);
    message2_text_ref.current.value = copytodo.text;
    setNewePriority(copytodo.priority);
    message2_priority_ref.current.value = copytodo.priority;
    setNewDate(copytodo.date);
    message2_date_ref.current.value = copytodo.date;
    setEditval(true);
  };

  const onEditbox2 = index => {
    setEditval2(true);
    setnewIndex(index);
  };

  const onEditChange = e => {
    setNewelement(e.target.value);
  };

  const onEditChange2 = e => {
    setNewePriority(e.target.value);
  };

  const onEditChange3 = e => {
    setNewDate(e.target.value);
  };

  const onEdit = (index, element, prio, date) => {
    const todoCopy = [...todo];
    todoCopy[index] = {
      ...todoCopy[index],
      text: element || todoCopy[index].text,
      isCompleted: todoCopy[index].isCompleted,
      priority: prio || todoCopy[index].priority,
      date: date !== undefined ? date : todoCopy[index].date,
    };
    setData(todoCopy);
    setEditval(false);
  };

  const onEdit2 = (index, element) => {
    const todCopy = [...todo];
    todCopy.splice(index, 1, { text: element, isCompleted: true });
    setData(todCopy);
    setEditval2(false);
  };

  const onChecked = (e, index) => {
    const todCopy = [...todo];
    todCopy[index].isCompleted = e.target.checked;
    setData(todCopy);
  };

  const allTask = () => {
    setMainboxeVal('all');
  };

  const completeTask = () => {
    setMainboxeVal('complete');
  };

  const uncompleteTask = () => {
    setMainboxeVal('uncomplete');
  };

  const countFunction = () => {
    const countAll = todo.length;
    const countComplete = todo.filter(item => item.isCompleted).length;
    const countUnComplete = todo.filter(item => !item.isCompleted).length;
    setcountTodo({ countAll, countComplete, countUnComplete });
  };

  return (
    <>
      <div className="mainbox">
        <div className="headline" ref={headline_ref}>
          <h2 className="head">
            <i class="fa-regular fa-circle-check fa-shake"></i>Todo Task
          </h2>

          <div className="box1outer">
            <div className="box1">
              <input
                type="text"
                onChange={onPush}
                value={userInput}
                className="box1Input1"
                ref={task_name_ref}
                onKeyDown={onFistKeyDown}
                placeholder="Enter Task Name.."
              />
              <input
                type="number"
                className="box1Input2"
                onChange={onPush2}
                ref={task_priority_ref}
                onKeyDown={onSecondKeyDown}
                placeholder="Priority"
              />
              <input
                type="date"
                defaultValue={today}
                className="box1Input3"
                ref={task_date_ref}
                onChange={onPush3}
                onKeyDown={onThirdKeyDown}
              />

              <button className="btn1" onClick={onAdd}>
                + Add Todo
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mainbox2" ref={mainbox_ref}>
        <div className="mainbox1">
          <div className="mainbox1headpart">
            <h3>Task</h3>
            <h3>Date</h3>
            <h3>Priority</h3>
          </div>
          <div className="mainbox1inner">
            <div className="mainbox1inner1">
              <p className="bluelink " onClick={allTask}>
                All
              </p>
              <div className="count_circle">{countTodo.countAll}</div>
            </div>

            <div className="mainbox1inner1 complete">
              <p className="bluelink " onClick={completeTask}>
                Completed
              </p>
              <div className="count_circle">{countTodo.countComplete}</div>
            </div>

            <div className="mainbox1inner1 uncomplete">
              <p className="bluelink " onClick={uncompleteTask}>
                Pending
              </p>
              <div className="count_circle">{countTodo.countUnComplete}</div>
            </div>
          </div>
        </div>

        <div
          className="box2"
          style={{ display: mainbox_val === 'all' ? 'block' : 'none' }}
        >
          {todo.map((item, index) => {
            return (
              <div className="box3">
                <div className="box31">
                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={e => {
                        onChecked(e, index);
                      }}
                    />
                  </div>
                </div>

                <div className="box32">
                  <p
                    className="item_name"
                    style={{
                      textDecoration: item.isCompleted
                        ? 'line-through'
                        : 'none',
                    }}
                  >
                    {item.text}
                  </p>
                  <div className="date_board">
                    <i className="fa-solid fa-calendar-days calender date_board_i"></i>
                    <p>{item.date}</p>
                  </div>
                  <div
                    className="priority_circle"
                    style={{
                      backgroundColor:
                        item.priority == 1
                          ? 'red'
                          : item.priority == 2
                          ? 'orange'
                          : item.priority == 3
                          ? '#c2be1b'
                          : 'gray',
                    }}
                  >
                    <div className="priority_circle">{item.priority}</div>
                  </div>
                </div>

                <div className="box4">
                  <i
                    className="fa-solid fa-pen-to-square"
                    onClick={() => {
                      onEditbox(index, 0);
                      mainbox_ref.current.style.filter = 'blur(2px)';
                      headline_ref.current.style.filter = 'blur(2px)';
                    }}
                  ></i>
                  <i
                    class="fa-solid fa-trash-can del"
                    onClick={() => {
                      onMessage(index, 0);
                      mainbox_ref.current.style.filter = 'blur(2px)';
                      headline_ref.current.style.filter = 'blur(2px)';
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div
          className="box2 "
          style={{ display: mainbox_val === 'complete' ? 'block' : 'none' }}
        >
          {todo
            .filter(item => item.isCompleted === true)
            .map((item, index) => {
              const originalIndex = todo.findIndex(
                todoItem => todoItem.text === item.text
              );
              return (
                <div className="box3">
                  <div className="box31">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={e => {
                          onChecked(e, originalIndex);
                        }}
                      />
                    </div>
                  </div>

                  <div className="box32">
                    <p
                      className="item_name"
                      style={{
                        textDecoration: item.isCompleted
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {item.text}
                    </p>
                    <div className="date_board">
                      <i className="fa-solid fa-calendar-days calender date_board_i"></i>
                      <p>{item.date}</p>
                    </div>
                    <div
                      className="priority_circle"
                      style={{
                        backgroundColor:
                          item.priority == 1
                            ? 'red'
                            : item.priority == 2
                            ? 'orange'
                            : item.priority == 3
                            ? '#c2be1b'
                            : 'gray',
                      }}
                    >
                      <div className="priority_circle">{item.priority}</div>
                    </div>
                  </div>

                  <div className="box4">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        onEditbox(originalIndex, 0);
                        mainbox_ref.current.style.filter = 'blur(2px)';
                        headline_ref.current.style.filter = 'blur(2px)';
                      }}
                    ></i>
                    <i
                      class="fa-solid fa-trash-can del"
                      onClick={() => {
                        onMessage(originalIndex, 0);
                        mainbox_ref.current.style.filter = 'blur(2px)';
                        headline_ref.current.style.filter = 'blur(2px)';
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
        </div>

        <div
          className="box2"
          style={{ display: mainbox_val === 'uncomplete' ? 'block' : 'none' }}
        >
          {todo
            .filter(item => item.isCompleted === false)
            .map((item, index) => {
              const originalIndex = todo.findIndex(
                todoItem => todoItem.text === item.text
              );
              return (
                <div className="box3">
                  <div className="box31">
                    <div className="checkbox">
                      <input
                        type="checkbox"
                        checked={item.isCompleted}
                        onChange={e => {
                          onChecked(e, originalIndex);
                        }}
                      />
                    </div>
                  </div>

                  <div className="box32">
                    <p
                      className="item_name"
                      style={{
                        textDecoration: item.isCompleted
                          ? 'line-through'
                          : 'none',
                      }}
                    >
                      {item.text}
                    </p>
                    <div className="date_board">
                      <i className="fa-solid fa-calendar-days calender date_board_i"></i>
                      <p>{item.date}</p>
                    </div>
                    <div
                      className="priority_circle"
                      style={{
                        backgroundColor:
                          item.priority == 1
                            ? 'red'
                            : item.priority == 2
                            ? 'orange'
                            : item.priority == 3
                            ? '#c2be1b'
                            : 'gray',
                      }}
                    >
                      <div className="priority_circle">{item.priority}</div>
                    </div>
                  </div>

                  <div className="box4">
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => {
                        onEditbox(originalIndex, 0);
                        mainbox_ref.current.style.filter = 'blur(2px)';
                        headline_ref.current.style.filter = 'blur(2px)';
                      }}
                    ></i>
                    <i
                      class="fa-solid fa-trash-can del"
                      onClick={() => {
                        onMessage(originalIndex, 0);
                        mainbox_ref.current.style.filter = 'blur(2px)';
                        headline_ref.current.style.filter = 'blur(2px)';
                      }}
                    ></i>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      <div
        className="message"
        style={{ display: message_val ? 'block' : 'none' }}
      >
        <h4>Are you sure</h4>
        <div>
          <button
            className="btn2"
            onClick={() => {
              setMessageVal(false);
              mainbox_ref.current.style.filter = 'none';
              headline_ref.current.style.filter = 'none';
            }}
          >
            Cancel
          </button>
          <button
            className="btn2"
            onClick={() => {
              onDelete(newIndex);
              mainbox_ref.current.style.filter = 'none';
              headline_ref.current.style.filter = 'none';
            }}
          >
            Ok
          </button>
        </div>
      </div>

      <div className="message2" style={{ display: editval ? 'block' : 'none' }}>
        <div className="message2_task">
          <input type="text" onChange={onEditChange} ref={message2_text_ref} />
        </div>
        <div className="message2_inner">
          <input
            type="number"
            onChange={onEditChange2}
            ref={message2_priority_ref}
            className="message2_priority"
          />
          <input
            type="date"
            onChange={onEditChange3}
            className="message2_date"
            ref={message2_date_ref}
          />
        </div>

        <div className="btns">
          <button
            className="btn2"
            onClick={() => {
              setEditval(false);
              mainbox_ref.current.style.filter = 'none';
              headline_ref.current.style.filter = 'none';
            }}
          >
            Cancel
          </button>
          <button
            className="btn3"
            onClick={() => {
              onEdit(newIndex, newelement, newePriority, newDate);
              mainbox_ref.current.style.filter = 'none';
              headline_ref.current.style.filter = 'none';
            }}
          >
            Ok
          </button>
        </div>
      </div>

      <div
        className="message2"
        style={{ display: editval2 ? 'block' : 'none' }}
      >
        <input type="text" onChange={onEditChange} />

        <div>
          <button
            className="btn2"
            onClick={() => {
              setEditval2(false);
            }}
          >
            Cancel
          </button>
          <button
            className="btn3"
            onClick={() => {
              onEdit2(newIndex, newelement);
            }}
          >
            Ok
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
