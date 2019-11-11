import React, { Fragment, useState } from 'react';

import { SimpleTopAppBar, TopAppBarFixedAdjust } from "@rmwc/top-app-bar"
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer"
import { List, ListItem, ListDivider } from "@rmwc/list"
import { Button } from "@rmwc/button"
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogButton } from "@rmwc/dialog"
import { TextField } from "@rmwc/textfield"


import { Route, Switch } from "react-router-dom"
import { useHistory } from "react-router"
import { connect } from "react-redux"

import EditClassroom from "./components/edit-classroom"
import EditSpinners from "./components/edit-spinners"
import Classroom from "./components/classroom"

import * as actions from "actions"

import "./App.css"
import '@material/dialog/dist/mdc.dialog.css'
import '@material/button/dist/mdc.button.css'
import '@material/icon-button/dist/mdc.icon-button.css';

const App = props => {

  const { serializedState } = props

  const [open, setOpen] = useState(false)
  const [importOpen, setImportOpen] = React.useState(false)
  const [temporaryState, setTemporaryState] = React.useState(serializedState)

  const history = useHistory()

  return (
    <Fragment>
      <Dialog
        open={importOpen}
        onClose={evt => {
          if (evt.detail.action === "accept") {
            try {
              if (JSON.parse(temporaryState)) {
                actions.initializeStore(temporaryState)
              }
            }
            catch(e) {
              console.log("CANNOT IMPORT INVALID DATA : ", e)
            }
          }
          else {
            setTemporaryState(serializedState)
            setImportOpen(false)
          }
        }}
      >
        <DialogTitle>Import/Export data</DialogTitle>
        <DialogContent>
          <TextField
            textarea
            outlined
            fullwidth
            label="App Data"
            rows={8}
            value={temporaryState}
            onChange={ e => setTemporaryState(e.target.value) }
          />
        </DialogContent>
        <DialogActions>
          <DialogButton action="close">Cancel</DialogButton>
          <DialogButton action="accept" isDefaultAction>
            Update
          </DialogButton>
        </DialogActions>
      </Dialog>
      <SimpleTopAppBar
        fixed
        title="Classroom Spinner"
        navigationIcon={{ onClick: () => setOpen(!open) }}
      />
      <Drawer modal open={open} onClose={() => setOpen(false)}>
        <DrawerHeader>
          <DrawerTitle>Classroom Spinner</DrawerTitle>
          <DrawerSubtitle>Choose your action</DrawerSubtitle>
        </DrawerHeader>
        <DrawerContent>
          <List>
            <ListItem className='centered-button-list-item'><Button label="Spin the wheel!" raised
              onClick={ () => {
                setOpen(false)
                history.push("/classroom")
              }
            }/></ListItem>
            <ListDivider />
            <ListItem className='centered-button-list-item'><Button label="Edit classrooms" raised
              onClick={ () => {
                setOpen(false)
                history.push("/edit-classroom")
              }
            }/></ListItem>
            <ListItem className='centered-button-list-item'><Button label="Edit Spinners" raised onClick={ () => { setOpen(false); history.push('/edit-spinners') } }/></ListItem>
            <ListDivider />
            <ListItem className='centered-button-list-item'><Button label="Import/Export data" raised
              onClick={ () => setImportOpen(true) }/></ListItem>
          </List>
        </DrawerContent>
      </Drawer>
      <TopAppBarFixedAdjust />
      <Switch>
        <Route exact path = "/">
          <div className="welcome-container">Welcome to the classroom spinner!</div>
        </Route>
        <Route path = "/classroom">
          <Classroom />
        </Route>
        <Route path = "/edit-spinners">
          <EditSpinners />
        </Route>
        <Route path = "/edit-classroom/:classroom_id?">
          <EditClassroom />
        </Route>
      </Switch>
    </Fragment>
  );
}

const mapStateToProps = state => ({
  classrooms : state.classrooms,
  spinners : state.spinners,
  serializedState : JSON.stringify(state, undefined, 2)
  //selectedSpinner : state.spinners[getSelectedSpinner(state)],
  //selectedClassroom : state.classrooms[getSelectedClassroom(state)]
})

export default connect(mapStateToProps, actions)(App);
