import React, {Fragment} from "react"
import { connect } from "react-redux"

import * as actions from "actions"
import { getSelectedClassroom, getSelectedSpinner } from "selectors"

import SelectSpinner from "./select-spinner"
import ClassroomSelector from "./classroom-selector"
import Spinner from "./spinner"

import "styles/classroom.css"

const Classroom = (props) => {
  const {
    classrooms,
    selectedClassroom,
    selectClassroom,
    spinners,
    selectedSpinner,
    selectSpinner,
    setRoster,
    setStudentStatus
  } = props
console.log("SEL : ", selectedClassroom, selectedSpinner)
  return (
    <Fragment>
      <div className="classroom-container">

        <div className="classroom-selector">
          <ClassroomSelector
            classrooms={classrooms}
            selectClassroom={selectClassroom}
          />
        </div>

        <div className="spinner-selector">
          <SelectSpinner
            spinners={spinners}
            selectSpinner={selectSpinner}/>
        </div>

        <div className="spinner">
          { selectedClassroom && selectedSpinner && <Spinner
            classroom={selectedClassroom}
            spinner={selectedSpinner}
            canSpin={true}
            setStudentStatus={setStudentStatus}
            setRoster={setRoster}
          />}
        </div>

      </div>
    </Fragment>
  )
}

const mapStateToProps = (state, props) => {

  return {
    selectedClassroom : getSelectedClassroom(state),
    classrooms : state.classrooms,
    selectedSpinner : getSelectedSpinner(state),
    spinners : state.spinners
  }
}

export default connect(mapStateToProps, actions)(Classroom)
