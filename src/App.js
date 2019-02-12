import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import DragTreeNodeRoot from './DragTreeNodeRoot';

class App extends Component {

  render() {
    let root = {
      id: "R1",
      name: "root",
      childs: [
        {
          id: "A",
          name: "項目1",
          childs: [
            {
              id: "D",
              name: "A",
              childs: [
                {
                  id: "E",
                  name: "E",
                  childs: [
                    {
                      id: "F",
                      name: "F",
                      childs: [
                        {
                          id: "G",
                          name: "G",
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "B",
          name: "項目2",
        },
        {
          id: "C",
          name: "項目3",
        }
      ]
    };

    let root2 = {
      name: "root2",
      id: "R2",
      childs: [
        {
          id: "a1",
          name: "項目1",
          childs: [
            {
              id: "a4",
              name: "A",
            }
          ]
        },
        {
          id: "a2",
          name: "項目2",
        },
        {
          id: "a3",
          name: "項目3",
        }
      ]
    };
    return (
      <div>
        <DragTreeNodeRoot node={root} />
        <DragTreeNodeRoot node={root2} />
      </div>
    );
  }
}

export default App;
