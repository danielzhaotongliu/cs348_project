import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Modal } from 'antd';

class EditUserInfoComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      password: '',
      email: '',
      phone: '',
      failed: false,
      invalidEmail: false,
    };
    this.handleShowModal = this.handleShowModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleShowModal() {
    this.setState({ visible: true });
  }

  handleOk() {
    const { uid, updateSuccessCallback } = this.props;
    const { password, email, phone } = this.state;
    const url = `api/customer/${uid}/edit/`;
    const params = {};
    if (password) {
      params.password = password;
    }
    if (email) {
      params.email = email;
    }
    if (phone) {
      params.phone = phone;
    }
    if (Object.keys(params).length === 0) {
      this.setState({ failed: true });
    } else {
      axios
        .patch(url, params)
        .then((response) => {
          if (response.status === 200) {
            this.setState({ visible: false, failed: false, invalidEmail: false });
            // NOTE: callback to notify parent of sucessful update
            updateSuccessCallback();
          }
        })
        .catch((error) => {
          console.log(error);
          this.setState({ failed: false, invalidEmail: true });
        });
    }
  }

  handleCancel() {
    this.setState({ visible: false });
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const { visible, email, password, failed, invalidEmail, phone } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.handleShowModal}>
          Edit
        </Button>
        <Modal
          title="Edit Account Information"
          visible={visible}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
        >
          <form style={{ display: 'table-caption' }}>
            <label>
              New Email:
              <input
                name="email"
                required
                type="email"
                value={email}
                onChange={this.handleChange}
              />
            </label>
            <label>
              New Phone:
              <input name="phone" required type="tel" value={phone} onChange={this.handleChange} />
            </label>
            <label>
              New Password:
              <input
                name="password"
                required
                type="password"
                value={password}
                onChange={this.handleChange}
              />
            </label>
          </form>
          {failed ? <div>Please edit at least one field.</div> : <div />}
          {invalidEmail ? <div>Please enter a valid email format.</div> : <div />}
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    uid: state.customer.uid,
  };
};

export default connect(mapStateToProps)(EditUserInfoComponent);
