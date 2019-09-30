import React, { PureComponent } from "react"
import { connect } from "react-redux"
import { TextField } from "@rmwc/textfield"

import { addClassroom, renameClassroom, setRoster } from "actions"
import { getSelectedClassroom } from "selectors"

class EditClassroom extends PureComponent {

  componentDidMount() {
    console.log("CDM : ", this.props)
    if (this.props.classroomID === undefined) {
      console.log("ADDS CLASSROOM")
      this.props.addClassroom()
    }
  }

  render() {

    const { classroom, renameClassroom, setRoster } = this.props

    return (
      <div>

        <TextField
          outlined
          label="Classroom"
          value={classroom.name || ""}
          onChange={ e => renameClassroom(classroom.id, e.target.value) }
        />

        <TextField
          textarea
          outlined
          fullwidth
          label="Students"
          rows={8}
          onChange={ e => setRoster(classroom.id, e.target.value.split(/\r?\n/)) }
        />

      </div>
    )
  }
}

const mapStateToProps = (state, props) => ({
  classroom : state.classrooms[getSelectedClassroom(state)] || {},
})

export default connect(mapStateToProps, { addClassroom, renameClassroom, setRoster })(EditClassroom)
