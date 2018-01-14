import {
    applyMiddleware,
    createStore,
    combineReducers,
} from 'redux'

import {rdxMiddleware, listenTo} from './index'

const reducer = (state = {}, action) => state
const reducers = combineReducers({reducer})
const store = createStore(
    reducers,
    applyMiddleware(rdxMiddleware)
)

describe('rdxMiddleware', () => {
    describe('with an registered action with callback', () => {
        const action = 'TEST_ACTION'
        const callback = jest.fn()
        listenTo(action, callback)
        describe('and a matching action', () => {
            it('executes callback with action as payload', () => {
                const testAction = {
                    type: action,
                    payload: {
                        test: 'lorem ipsum'
                    }
                }
                store.dispatch(testAction)
                expect(callback.mock.calls.length).toBe(1)

                const callbackArguments = callback.mock.calls[0]
                expect(callbackArguments[0]).toBe(testAction)
            })
            it('executes callback with action as payload', () => {
                store.dispatch({
                    type: 'DIFFERENT_ACTION'
                })
                expect(callback.mock.calls.length).toBe(1)
            })
        })
    })
})