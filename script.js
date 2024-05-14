firebase.intiallizeapp({
    apiKey: "AIzaSyC6LhMzc1ZlGSzPuPnycw1Hm3c3yy7dggU",
  authDomain: "power-learn-project.firebaseapp.com",
  projectId: "power-learn-project",
  storageBucket: "power-learn-project.appspot.com",
  messagingSenderId: "215551516132",
  appId: "1:215551516132:web:77d3652142203ad11b3bf1"
});
const db = firebase.firestore();
function addTask() {
    const taskInput = document.getElementById("task-input");
    const task = taskInput.value.trim();
    if (task !== "") {
      db.collection("tasks").add({
        task: task,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      taskInput.value = "";
    }
  }
  
  // Function to render tasks
  function renderTasks(doc) {
    const taskList = document.getElementById("task-list");
    const taskItem = document.createElement("li");
    taskItem.className = "task-item";
    taskItem.innerHTML = `
      <span>${doc.data().task}</span>
      <button onclick="deleteTask('${doc.id}')">Delete</button>
    `;
    taskList.appendChild(taskItem);
  }
  
  // Real-time listener for tasks
  db.collection("tasks")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      const changes = snapshot.docChanges();
      changes.forEach(change => {
        if (change.type === "added") {
          renderTasks(change.doc);
        }
      });
    });
  
  // Function to delete a task
  function deleteTask(id) {
    db.collection("tasks").doc(id).delete();
  }