import React, { Fragment, useState } from 'react';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from "@rmwc/top-app-bar"
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer"
import { List, ListItem, CollapsibleList, SimpleListItem, ListDivider } from "@rmwc/list"
import { Button } from "@rmwc/button"
import { Route, Switch } from "react-router-dom"
import { useHistory } from "react-router"
import { connect } from "react-redux"

import Spinner from "./components/Spinner"
import EditClassroom from "./components/edit-classroom"
import EditSpinners from "./components/edit-spinners"

import { selectSpinner, selectClassroom } from "actions"
import { getSelectedSpinner, getSelectedClassroom } from "selectors"

import "./App.css"

const App = props => {

  const [open, setOpen] = React.useState(false)

  const history = useHistory()

  const { spinners, classrooms, selectedSpinner, selectedClassroom } = props
console.log("APP PROPS : ", selectedSpinner, props)
  return (
    <Fragment>
      <SimpleTopAppBar
        fixed
        title="Classroom Spinner"
        navigationIcon={{ onClick: () => setOpen(!open) }}
      />
    <Drawer modal open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Classroom Spinner</DrawerTitle>
          <DrawerSubtitle>Subtitle</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            { Object.keys(classrooms).sort().map( classroomID => {
              const classroom = classrooms[classroomID]
              return <CollapsibleList
                handle={
                  <SimpleListItem
                    text={ classroom.name }
                    metaIcon="chevron_right"
                  />
                }
                onOpen={() => console.log('open')}
                onClose={() => console.log('close')}
              >
                { Object.keys(spinners).sort().map( spinnerID => {
                  const spinner = spinners[spinnerID]
                  return <SimpleListItem
                    text={ spinner.name }
                    onClick={() => {
                      selectClassroom( classroomID )
                      selectSpinner(spinnerID)
                      history.push('/spinner')
                    }}
                  />
                })}
                <ListItem><Button label="Edit classroom" outlined /></ListItem>
              </CollapsibleList>
            })}
            <ListDivider />
            <ListItem className='centered-button-list-item'><Button label="Add classroom" raised onClick={ () => { setOpen(false); history.push('/add-classroom') } }/></ListItem>
            <ListItem className='centered-button-list-item'><Button label="Edit Spinners" raised onClick={ () => { setOpen(false); history.push('/edit-spinners') } }/></ListItem>
          </List>
        </DrawerContent>
      </Drawer>
      <TopAppBarFixedAdjust />
      <Switch>
        <Route exact path = "/">
          <div className="welcome-container">Welcome to the classroom spinner!</div>
        </Route>
        <Route path = "/spinner">
          { selectedSpinner && selectedClassroom && <Spinner
            scheme={ selectedSpinner.scheme }
            kids={ selectedClassroom.roster }
            canSpin={true}
          /> }
        </Route>
        <Route path = "/edit-spinners">
          <EditSpinners />
        </Route>
        <Route path = "/add-classroom">
          <EditClassroom />
        </Route>
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  classrooms : state.classrooms,
  spinners : state.spinners,
  selectedSpinner : state.spinners[getSelectedSpinner(state)],
  selectedClassroom : state.classrooms[getSelectedClassroom(state)]
})

export default connect(mapStateToProps, { selectSpinner, selectClassroom })(App);
