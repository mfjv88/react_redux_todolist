import React from 'react';
import { connect } from 'react-redux';
import setVisibilityFilter from '../action/action_creators';

// FOOTER COMPONENT
export default class Footer extends React.Component {

  Link(
  active,
  currentFilter,
  children,
  onClick
  ) {
    if(active){
      return <span>{children}</span>;
    }

    return(
      <a href='#'
        onClick={e => {
          e.preventDefault();
          onClick();
        }}
      >
      {children}
    </a>
    );
  }

  mapStateToLinkProps(
    state,
    ownProps
  ){
    return {
      active :
        ownProps.filter ===
        state.visibilityFilter
    };
  }

  mapDispatchToLinkProps(
    dispatch,
    ownProps
  ){
    return {
      onClick: () =>{
        dispatch(setVisibilityFilter(ownProps.filter));
      }
    };
  }

  FilterLink() {
    connect(
    this.mapStateToLinkProps(),
    this.mapDispatchToLinkProps()
  )(this.Link());
}

  render() {
    const Link = this.Link();
    const FilterLink = this.FilterLink();
    FilterLink.contextTypes = {
      store: React.PropTypes.object
    };
    const mapDispatchToLinkProps = this.mapDispatchToLinkProps();
    const mapStateToLinkProps = this.mapStateToLinkProps();
    return (
        <p>
          Show:
          {' '}
          <FilterLink
            filter='SHOW_ALL'
            >
            All
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_ACTIVE'
            >
            Active
          </FilterLink>
          {' '}
          <FilterLink
            filter='SHOW_COMPLETED'
            >
            Completed
          </FilterLink>
        </p>
      )
  }
}
