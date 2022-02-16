export const FETCH_RECAPS = 'FETCH_RECAPS';
export const SAVE_RECAPS = 'SAVE_RECAPS';
export const ADD_FIELD_NAP = 'ADD_FIELD_NAP';
export const REMOVE_FIELD_NAP = 'REMOVE_FIELD_NAP';
export const CHANGE_VALUE_TEXT = 'CHANGE_VALUE_TEXT';
export const CHANGE_MOOD = 'CHANGE_MOOD';
// export const CHANGE_TIME_NAP_START = 'CHANGE_TIME_NAP_START';
// export const CHANGE_TIME_NAP_END = 'CHANGE_TIME_NAP_END';
export const CHANGE_TIME_NAP = 'CHANGE_TIME_NAP';

export const CREATE_RECAP ='CREATE_RECAP';
export const CHANGE_DATE = 'CHANGE_DATE'
export const SAVE_RECAP = 'SAVE_RECAP';
export const FILTER_RECAPS = 'FILTER_RECAPS';
export const RECAP_TO_FALSE = 'RECAP_TO_FALSE'

export const fetchRecaps = () => ({
  type: FETCH_RECAPS,
})

export const saveRecaps = (recaps) => ({
  type: SAVE_RECAPS,
  payload: recaps,
});

export const addFieldNap = () => ({
  type: ADD_FIELD_NAP,
});

export const removeFieldNap = () => ({
  type: REMOVE_FIELD_NAP,
});

export const changeValueText = (key, value) => ({
  type: CHANGE_VALUE_TEXT,
  value,
  key,
});

export const createRecapToFalse = () => ({
  type: RECAP_TO_FALSE,
})

export const changeMood = (key, value) => ({
  type: CHANGE_MOOD,
  value,
  key,
});

export const changeTimeNap = (key, value) => ({
  type: CHANGE_TIME_NAP,
  value,
  key,
});

// export const changeTimeNapStart = (key, value) => ({
//   type: CHANGE_TIME_NAP_START,
//   value,
//   key,
// });
// export const changeTimeNapEnd = (key, value) => ({
//   type: CHANGE_TIME_NAP_END,
//   value,
//   key,
// });

export const submitFormCreateRecap = (child_id) => ({
  type: CREATE_RECAP,
  child_id,
});

export const changeDate = (value, key) => ({
  type: CHANGE_DATE,
  key,
  value,
});

export const saveRecap = (recap) => ({
  type: SAVE_RECAP,
  payload: recap,
});

export const filterRecaps = (filterInputValue) => ({
  type: FILTER_RECAPS,
  filterInputValue,
});

