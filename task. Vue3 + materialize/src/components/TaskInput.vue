<template>
    <form class="col s12">
        <div class="col">
            <div class="input-field col s4">
                <textarea v-model="title" class="materialize-textarea"></textarea>
                <label for="todo_title">A small title would be nice...</label>
            </div>
            <div class="input-field col s4">
                <textarea v-model="description" class="materialize-textarea"></textarea>
                <label for="todo_description">Maybe add a little description...</label>
            </div>
            <div class="s4">
                <a class="waves-effect waves-light btn" @click="onAddTask">Add task</a>
            </div>
        </div>
    </form>
</template>

<script>
/* eslint-disable */
import { ref } from 'vue'

export default {
    emits: {
        onAddTask({ title, description }) {
            if (title === '' || description === '') {
                alert('Please select a title or description')
                return false
            }

            return true
        }
    },
    setup(props, { emit }) {
        const title = ref('');
        const description = ref('');

        const onAddTask = () => {
            emit('onAddTask', { title: title.value, description: description.value })
        }

        return {
            title, description, onAddTask
        }
    },
    methods: {
        addTodo() {
            console.log('todo')
        }
    },
}
</script>

<style lang="scss" scoped>
</style>