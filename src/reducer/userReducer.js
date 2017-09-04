export default function courseReducer(state = [], action){
	switch(action.type){
		case 'SAVE_User':
			return [...state, Object.assign({}, action.user)];

		default:
			return state;
	}
}