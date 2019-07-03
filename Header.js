import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { onLogoutUser } from '../actions'

import {
    Button,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem, UncontrolledDropdown,DropdownToggle,
    DropdownMenu, DropdownItem } from 'reactstrap';

class Header extends Component {
    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }
      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      onButtonClick = () => {
          // menghapus username dari redux state
          this.props.onLogoutUser()
      }

    render () {
        if(this.props.user.username === ''){
            // Render ketika belum login
            return (
                <div>
                    <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                        <NavItem>
                            <Link to='/' >All Products</Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/register'>
                                <Button color="primary" className="mx-3">Register</Button>
                            </Link>
                        </NavItem>
                        <NavItem>
                            <Link to='/login' >
                                <Button color="success">Login</Button>
                            </Link>
                        </NavItem>
                        </Nav>
                    </Collapse>
                    </Navbar>
                </div>
            )
        } 

        // Render setelah login
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/">simpleMerce</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                    <NavItem className='mt-2'>
                        <Link to='/' >All Products</Link>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        Hallo, {this.props.user.username}
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem>
                        Option 1
                        </DropdownItem>
                        <DropdownItem>
                        Option 2
                        </DropdownItem>
                        <DropdownItem divider />
                        <Button className='dropdown-item' onClick={this.onButtonClick}>
                            Logout
                        </Button>
                    </DropdownMenu>
                    </UncontrolledDropdown>
                    </Nav>
                </Collapse>
                </Navbar>
            </div>
            
                    
          );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth // {id, username}
    }
}

export default connect(mapStateToProps, {onLogoutUser})(Header)