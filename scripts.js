const todo=(state,action)=>{
	switch(action.type){
		case 'ADD_TODO':
			return {
				id:action.id,
				text:action.text,
				completed:false
			}
		case 'TOGGLE':
			if(state.id!==action.id){
					return state
				}
			return {
					...state,
					completed: !state.completed
				}
		default:
			return state;
	}
}

const todos= (state=[],action)=>{
	switch(action.type){
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined,action)
			]
		case 'TOGGLE':
			return state.map(t=>todo(t,action))
		default:
			return state;
	}
};



const testTodo=()=>{
	const stateBefore=[];
	const action ={
		type:'ADD_TODO',
		id:0,
		text:'Learn dis redux'
	}
	const stateAfter=[{
		id:0,
		text:'Learn dis redux',
		completed:false
	}]
	expect(todos(stateBefore,action)).toEqual(stateAfter);
}

const testToggleTodo=()=>{
	const stateBefore=[
		{
			id:0,
			text:'Learn dis redux',
			completed:false
		},
		{
			id:1,
			text:'Learn dis react',
			completed:false
		},
	]
	const action={
		type:'TOGGLE',
		id:1
	}
	const stateAfter=[
		{
			id:0,
			text:'Learn dis redux',
			completed:false
		},
		{
			id:1,
			text:'Learn dis react',
			completed:true
		},
	]
	expect(todos(stateBefore,action)).toEqual(stateAfter);
}

const visabilityFilter =(state='SHOW_ALL',action)=>{
	switch (action.type){
		case 'SET_VISABILITY_FILTER':
			return action.filter
		default :
			return state;
	}
}

const { combineReducers } = Redux;

const rootReducer=combineReducers({todos,visabilityFilter})

testTodo();
testToggleTodo();
console.log('all tests passed!!')

const { createStore }= Redux;
const store = createStore(rootReducer);
console.log('Initial State')
console.log(store.getState());
store.dispatch(
{type:'ADD_TODO',id:0,text:'Finish Project'}
)
store.dispatch(
{type:'ADD_TODO',id:1,text:'Finish Dishes'}
)
store.dispatch(
{type:'TOGGLE',
id:0}
)
console.log(store.getState());


