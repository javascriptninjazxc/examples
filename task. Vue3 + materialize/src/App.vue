<template>
  <div class="todo">
    <TaskInput @onAddTask="addTask" />
    <TaskList @OnDone="setDoneTask" @onRemove="setRemoveTask" :models="list" />
  </div>
</template>

<script>
import TaskList from './components/TaskList.vue';
import TaskInput from './components/TaskInput.vue';

import { ref } from 'vue'
export default {
  name: "App",
  components: { TaskList, TaskInput },
  setup() {

    let list = ref(
      [
        {
          id: 0,
          title: 'create a new title',
          description: 'create a new description',
          done: false
        }
      ]
    );

    let addTask = ({ title, description }) => {
      list.value.push({
        id: list.value[list.value.length - 1].id + 1,
        title: title,
        description: description,
        done: false
      })
    }

    let setDoneTask = (id) => {
      list.value.map(task => {
        if(task.id === id) {
          task.done = true;
        }
        
        return task;
      })
    }

    let setRemoveTask = (id) => {
      list.value = list.value.filter(task => task.id !== id)
    }

    return {
      addTask, list, setDoneTask, setRemoveTask
    }
  }
}
</script>
