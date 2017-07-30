import React from 'react';
import { connect } from 'react-redux';
import setVisibilityFilter from '../action/action_creators';

// FOOTER COMPONENT
const mapStateToLinkProps = ( state, ownProps ) => ({
    active :
      ownProps.filter ===
      state.visibilityFilter
});

const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => ({
    onClick(){
      dispatch(setVisibilityFilter(ownProps.filter));
    },
})

const Link = ({
  active,
  currentFilter,
  children,
  onClick
}) => {
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
};

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link);

FilterLink.contextTypes = {
  store: React.PropTypes.object
};

const Footer = () => (
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
);

export default Footer;


// export default class Footer extends React.Component {
//
//   Link(
//   active,
//   currentFilter,
//   children,
//   onClick
//   ) {
//     if(active){
//       return <span>{children}</span>;
//     }
//
//     return(
//       <a href='#'
//         onClick={e => {
//           e.preventDefault();
//           onClick();
//         }}
//       >
//       {children}
//     </a>
//     );
//   }
//
//   mapStateToLinkProps(
//     state,
//     ownProps
//   ){
//     return {
//       active :
//         ownProps.filter ===
//         state.visibilityFilter
//     };
//   }
//
//   mapDispatchToLinkProps(
//     dispatch,
//     ownProps
//   ){
//     return {
//       onClick: () =>{
//         dispatch(setVisibilityFilter(ownProps.filter));
//       }
//     };
//   }
//
//   FilterLink() {
//     connect(
//     this.mapStateToLinkProps(),
//     this.mapDispatchToLinkProps()
//   )(this.Link());
// }
//
//   render() {
//     const Link = this.Link();
//     const FilterLink = this.FilterLink();
//     FilterLink.contextTypes = {
//       store: React.PropTypes.object
//     };
//     const mapDispatchToLinkProps = this.mapDispatchToLinkProps();
//     const mapStateToLinkProps = this.mapStateToLinkProps();
//     return (
//         <p>
//           Show:
//           {' '}
//           <FilterLink
//             filter='SHOW_ALL'
//             >
//             All
//           </FilterLink>
//           {' '}
//           <FilterLink
//             filter='SHOW_ACTIVE'
//             >
//             Active
//           </FilterLink>
//           {' '}
//           <FilterLink
//             filter='SHOW_COMPLETED'
//             >
//             Completed
//           </FilterLink>
//         </p>
//       )
//   }
// }
