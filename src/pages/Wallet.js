import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';

class Wallet extends Component {
  render() {
    const { editSpense, editSpenseId } = this.props;
    return (
      <>
        <Header />
        <main>
          <WalletForm editing={ editSpense } editingId={ editSpenseId } />
          <Table />
        </main>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  editSpense: state.wallet.editor,
  editSpenseId: state.wallet.idToEdit,
});

Wallet.propTypes = {
  editSpense: PropTypes.bool.isRequired,
  editSpenseId: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Wallet);
