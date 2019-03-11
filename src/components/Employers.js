import React, { Component } from 'react';  

const getFakeMembers = count => new Promise((resolves, rejects) => {
  const api = `https://api.randomuser.me/?nat=US&results=${count}`
  const request = new XMLHttpRequest()
  request.open('GET', api)
  request.onload = () =>
    (request.status === 200) ?
    resolves(JSON.parse(request.response).results) : 
  request.onerror = (err) => rejects(err)
  request.send()
}) 

//onClick = {() => {console.log('ss');}}

const Member = ({ gender,email, picture, name, location, dob, }) =>
  <div className="member">  
    <div className="member__img"><img src={picture.medium} alt="" /></div>
    <div className="member__right">
      <div className="member__name">{name.title}. {name.first} {name.last}</div>
      <div>Возраст - {dob.age}</div>
      <div>Пол - {gender}</div>
      <div className="member__place">{location.city}, {location.state}</div>
      <div>{location.street}</div>
      <div className="member__mail"><a href={"mailto:" + email}>{email}</a></div>      
    </div>
  </div>

class Employers extends Component {  

  constructor(props) {
    super(props)
    this.state = {
      members: [],
      loading: false,
      error: null,
      memCount: 3
    }
  }  

 

  handMemPlus = (e) => {
    e.preventDefault()
    
    let memSum = this.state.memCount
    memSum = ++memSum; 
    this.setState({ memCount: memSum }) 

    getFakeMembers(memSum).then(
      members => {
        this.setState({
          members,
          loading: false
        })
      },
      error => {
        this.setState({
          error,
          loading: false
        })
      }
    )

  }

  handMemMinus = (e) => {  
    e.preventDefault()    
    
    let memSum = this.state.memCount
    memSum = --memSum; 
    this.setState({ memCount: memSum }) 
      
    getFakeMembers(memSum).then(
      members => {
        this.setState({
          members,
          loading: false
        })
      },
      error => {
        this.setState({
          error,
          loading: false
        })
      }
    )
  }

  componentDidMount() {
    this.setState({
      loading: true
    })
    getFakeMembers(this.state.memCount).then(
      members => {
        this.setState({
          members,
          loading: false
        })
      },
      error => {
        this.setState({
          error,
          loading: false
        })
      }
    )
  }

  render() {
    const { members, loading, error } = this.state
    return (
    <div className="container">
      <div>Рандомы в асинхроне с https://api.randomuser.me/</div>
      <div className="member-buttons">
      <div className="member-buttons__length">Всего рандомов: <strong>{members.length}</strong></div>
        <div className="member-buttons__action" onClick={this.handMemPlus}>+ Больше рандомов</div>
        {members.length > 1 ? <div className="member-buttons__action" onClick={this.handMemMinus}>- Меньше рандомов</div>: null}
      </div>
      <div className="member-list">      
        {(loading) ?
        <span>Loading Members</span> :
        (members.length) ?
          members.map((user, i) =>
          <Member  key={i} {...user} />
        ) :
      <span>0 рандомов ...</span>
      }
    {(error) ? <p>Ошибка</p> : ""}
    </div>
  </div>
  
    )
  }
} 

export default Employers;
