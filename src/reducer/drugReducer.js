export default function courseReducer(state = [], action){
	switch(action.type){
		case 'SAVE_DRUG':
			return [...state, Object.assign({}, action.drug)];

		default:
			return state;
	}
}