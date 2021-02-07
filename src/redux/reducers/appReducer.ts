import { range } from 'lodash'
import { actionsKeys, AppActions } from '../actions/appActionsTypes'
import { Game, isCellActive } from '../../logic/gameLogic'

export type State = {
  game: Game
  columns: number
  rows: number
}

export const initialState: State = {
  game: [],
  columns: 0,
  rows: 0
}

function getNewGame(rows: number, columns: number): Game {
  return range(rows).map(() => {
    return range(columns).map(() => false)
  })
}

export function appReducer(state: State = initialState, action: AppActions) {
  switch (action.type) {
    case actionsKeys.INIT_GAME: {
      const { rows, columns } = action.payload
      return {
        game: getNewGame(rows, columns),
        columns,
        rows
      }
    }
    case actionsKeys.RESET_GAME:
      const { rows, columns } = state
      return {
        ...state,
        game: getNewGame(rows, columns)
      }
    case actionsKeys.ITERATE_GAME:
      return {
        ...state,
        game: range(state.rows).map(row => {
          return range(state.columns).map(column => isCellActive(row, column, state.game))
        })
      }
    case actionsKeys.ADD_CELL:
      const { column: cellColumn, row: cellRow } = action.payload
      return {
        ...state,
        game: range(state.rows).map(row => {
          return range(state.columns).map(column => {
            if (row === cellRow && column === cellColumn) {
              return !state.game[row][column]
            }
            return state.game[row][column]
          })
        })
      }
    default:
      return state
  }
}
