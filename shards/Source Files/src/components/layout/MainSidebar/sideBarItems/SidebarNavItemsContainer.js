import React from 'react';
import SidebarNavItems from "./SidebarNavItems";
import {connect} from "react-redux";

let MapStateToProps = (state) => ({
  navItems: state.sideBarNavigation.navItemsInfo,
})



const SidebarNavItemsContainer = connect(MapStateToProps)(SidebarNavItems)


export default SidebarNavItemsContainer;
