import React, { useState, FC, Fragment } from 'react';
import Loader from 'react-loader-spinner';
import { connect } from 'react-redux';

interface IState {}
interface IProps {
  loading?: boolean | string;
  vox_loading?: any;
}
class LoadercScreen extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { loading, vox_loading } = this.props;
    return (
      <div>
        {loading || vox_loading ? (
          <div className="loader-container">
            <div className="loader">
              <Loader type="Audio" color="#69F0B4" />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    );
  }
}
interface RootState {
  auth: {
    loading: boolean;
    vox_loading: boolean;
  };
}

const mapStateToProps = (state: RootState) => {
  return { loading: state.auth.loading, vox_loading: state.auth.vox_loading };
};

export default connect(
  mapStateToProps,
  {}
)(LoadercScreen);
