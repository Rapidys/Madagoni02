import React from "react";
import {Nav} from "shards-react";
import SidebarNavItem from "./SidebarNavItem";
import Counter from "./Counter/Counter";

class SidebarNavItems extends React.Component {


  render() {
    return (
      <div className="nav-wrapper d-flex">
        <Nav className="nav--no-borders flex-column">
          {this.props.navItems.map((item, idx) => (
            <div key={idx}>
              <SidebarNavItem item={item} Counter={this.props.Counter}/>
            </div>
          ))}
          <Counter />
        </Nav>
      </div>
    )
  }
}

export default SidebarNavItems;
