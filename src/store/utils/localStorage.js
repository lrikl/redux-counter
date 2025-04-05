const COUNTER_STATE_KEY = 'counterState';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(COUNTER_STATE_KEY);
    if (serializedState === null) {
      return undefined; // Повертаємо undefined, щоб Redux використовував початковийдержаву зі слайсу
    }
    const parsedState = JSON.parse(serializedState);
    return { // Важливо: повертаємо об'єкт, структура якого відповідає попередньомудержаві
        counterSimple: {value: parsedState.simpleCount},
        counterEmojis: {counts: parsedState.emojisCount,
            flyingEmojis: [],               
            showResults: false  
        }
    };

  } catch (error) {
    console.error("Could not load state from localStorage", error);
    return undefined;
  }
};


export const saveState = (state) => { // Приймає весь стан Redux, але зберігаємо лише потрібну частину
  try {
    const stateToSave = { 
        simpleCount: state.counterSimple.value,
        emojisCount: state.counterEmojis.counts

    };
    const serializedState = JSON.stringify(stateToSave);
    localStorage.setItem(COUNTER_STATE_KEY, serializedState);
  } catch (error) {
    console.error("Could not save state to localStorage", error);
  }
};