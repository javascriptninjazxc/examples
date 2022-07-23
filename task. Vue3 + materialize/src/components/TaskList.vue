<template>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Done</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="model in models" :key="model.id">
                <td>{{ model.title }}</td>
                <td>{{ model.description }}</td>
                <td>
                    <a v-show="!model.done"
                        class="btn-floating btn-large waves-effect waves-light light-green accent-4 tooltipped"
                        data-position="bottom" data-tooltip="I'm done with this one!"><i class="material-icons"
                            @click="emitOnDone(model.id)">✓</i></a>

                    <a v-show="model.done" class="btn-floating btn-large waves-effect red accent-4 tooltipped"
                        data-position="bottom" data-tooltip="Click me to delete this one!"><i class="material-icons"
                            @click="emitOnRemove(model.id)">✕</i></a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        models: {
            default: {
                id: 0,
                title: 'Create a new task',
                description: 'This is new task description',
                done: false
            }
        },
    },
    setup(props, { emit }) {
        const emitOnDone = (id) => {
            emit('onDone', id);
        }

        const emitOnRemove = (id) => {
            emit('onRemove', id)
        }

        return {
            emitOnDone, emitOnRemove
        }
    },
}
</script>

<style lang="scss" scoped>
</style>