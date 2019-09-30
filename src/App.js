import React, { Fragment, useState } from 'react';
import { SimpleTopAppBar, TopAppBarFixedAdjust } from "@rmwc/top-app-bar"
import { Drawer, DrawerHeader, DrawerTitle, DrawerSubtitle, DrawerContent } from "@rmwc/drawer"
import { List, ListItem, CollapsibleList, SimpleListItem, ListDivider } from "@rmwc/list"
import { Button } from "@rmwc/button"
import { Route, Switch } from "react-router-dom"
import { useHistory } from "react-router"

import Spinner from "./components/Spinner"
import AddClassroom from "./components/add-classroom"
import EditSpinners from "./components/edit-spinners"

import "./App.css"

const App = props => {

  const [open, setOpen] = React.useState(false)

  const history = useHistory()

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
            <CollapsibleList
              handle={
                <SimpleListItem
                  text="Mr. Thomason's Class"
                  metaIcon="chevron_right"
                />
              }
              onOpen={() => console.log('open')}
              onClose={() => console.log('close')}
            >
              <SimpleListItem text="Spinner 1" />
              <SimpleListItem text="Spinner 2" />
              <SimpleListItem text="Spinner 3" />
              <ListItem><Button label="Edit classroom" outlined /></ListItem>
            </CollapsibleList>
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
          <Spinner scheme="Set1" canSpin={true} />
        </Route>
        <Route path = "/edit-spinners">
          <EditSpinners />
        </Route>
        <Route path = "/add-classroom">
          <AddClassroom />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
