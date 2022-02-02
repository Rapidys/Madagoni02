import React from "react";
import classNames from "classnames";
import {Col} from "shards-react";
import SidebarMainNavbar from "./SidebarMainNavbar";
import SidebarNavItemsContainer from "./sideBarItems/SidebarNavItemsContainer";
import {Store} from "../../../Redux/HeaderMenu";


class MainSidebar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      menuVisible: false,
    };

    this.onChange = this.onChange.bind(this);
  }

  componentWillMount() {
    Store.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    Store.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState({
      ...this.state,
      menuVisible: Store.getMenuState(),
      sidebarNavItems: Store.getSidebarItems()
    });
  }


  render() {
    const classes = classNames(
      "main-sidebar",
      "px-0",
      "col-12",
      this.state.menuVisible && "open"
    );

    return (
      <Col
        tag="aside"
        className={classes}
        lg={{size: 2}}
        md={{size: 3}}
      >
        <SidebarMainNavbar/>
        <SidebarNavItemsContainer/>

      </Col>
    );
  }
}


export default MainSidebar;
