import React, { Component } from 'react';
import axios from 'axios';

export default class PostMember extends Component {
  constructor(props) {
    super(props);

    this.state = {
      member: {}
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;

    axios.get(`/member/${id}`).then((res) => {
      if (res.data.success) {
        this.setState({
          member: res.data.member
        });
        console.log(this.state.member);
      }
    });
  }

  render() {

    const { memberName, address, email, phoneNumber, gender, weight, height, joiningDate, otherDetails } = this.state.member;

    return (
      <div className='container' style={{ marginBottom: '50px' }}>
        <div className='main'>
          <div style={{ marginTop: '20px' }}>
            <h4>{memberName}</h4>
            <hr></hr>

            <dl className='row'>
              <dt className='col-sm-3'>Member Name: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{memberName}</p>
              </div>

              <dt className='col-sm-3'>Address: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{address}</p>
              </div>

              <dt className='col-sm-3'>Email: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{email}</p>
              </div>

              <dt className='col-sm-3'>Phone Number: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>+94 {phoneNumber}</p>
              </div>

              <dt className='col-sm-3'>Gender: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{gender}</p>
              </div>

              <dt className='col-sm-3'>Weight: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{weight}kg</p>
              </div>

              <dt className='col-sm-3'>Height: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{height}cm</p>
              </div>

              <dt className='col-sm-3'>Joined Date: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{joiningDate}</p>
              </div>

              <dt className='col-sm-3'>Other Details: </dt>
              <div className='col-sm-9'>
                <p className='font-weight-normal'>{otherDetails}</p>
              </div>
            </dl>

            <a href='/memberlist'><button type='button' class="btn btn-outline-success" style={{ marginTop: '15px' }}><i class="fa-solid fa-angle-left"></i>&nbsp;Back</button></a>
          </div>
        </div>
      </div>
    )
  }
}