import { assign, createMachine, sendParent, interpret, State } from 'xstate';

const coditions = {
    STATUS: [
        {
            target: 'doing',
            cond: (context, event) => {
                return event.body === 'doing';
            },
            actions: [
                (context, event) => {
                    context.doing = true;
                }
            ]
        },
        {
            target: 'needInfo',
            cond: (context, event) => {
                return event.body === 'needInfo';
            },
            actions: [
                (context, event) => {
                    context.needInfo = true;
                }
            ]
        },
        {
            target: 'completed',
            cond: (context, event) => {
                return event.body === 'completed';
            },
            actions: [
                (context, event) => {
                    context.completed = true;
                }
            ]
        },
        {
            target: 'confirmed',
            cond: (context, event) => {
                return event.body === 'confirmed';
            },
            actions: [
                (context, event) => {
                    context.confirmed = true;
                }
            ]
        },
        {
            target: 'closed',
            cond: (context, event) => {
                return event.body === 'closed';
            },
            actions: [
                (context, event) => {
                    context.closed = true;
                }
            ]
        },
    ]
}

const todoMachine = createMachine({
    id: 'todoMachine',
    initial: 'idle',
    context: <any>{
        pending: false,
        doing: false,
        needInfo: false,
        completed: false,
        confirmed: false,
        closed: false,
    },
    on: {
        RESTART: {
            target: 'idle',
            actions: [
                assign({
                    pending: true,
                    doing: false,
                    needInfo: false,
                    completed: false,
                    confirmed: false,
                    closed: false,
                }),
                //  sendParent((context) => ({ type: "TODO.COMMIT", todo: context }))
            ]
        },
        FINISH: {
            target: 'end',
            actions: [
                (context, event) => {
                    context.closed = true;
                }
            ]
        },
        START: {
            target: 'doing',
            actions: [
                (context, event) => {
                    context.doing = true;
                }
            ]
        }
    },
    states: {
        idle: {},
        doing: {
            on: {
                ...coditions
            }
        },
        needInfo: {
            on: {
                ...coditions
            }
        },
        completed: {
            on: {
                ...coditions
            },
        },
        confirmed: {
            on: {
                ...coditions
            },
        },
        closed: {
            on: {
                ...coditions
            },
        },
        end: {}
    }
});

//pass the last state machine to the interpreter
// const stateDefinition = JSON.parse(localStorage.getItem('app-state')) || todoMachine.initialState;
// // Use State.create() to restore state from a plain object
// const previousState = State.create(stateDefinition);
// const service = interpret(todoMachine).start(previousState);

export const promiseService = interpret(todoMachine);
