import React from 'react'

  const mydata = [
    {
      id: 1,
      author: 'Запись 1',
      text: 'маленький текст... маленький текст... маленький текст... маленький текст... маленький текст...',
      bigText: 'БОЛЬШОЙ ТЕКСТ... БОЛЬШОЙ ТЕКСТ... БОЛЬШОЙ ТЕКСТ... БОЛЬШОЙ ТЕКСТ... БОЛЬШОЙ ТЕКСТ... БОЛЬШОЙ ТЕКСТ... '
    },
 
  ];

  class Article extends React.Component {
    state = {
      visible: false,
    }
    handleReadMoreClck = (e) => {
      e.preventDefault()
      this.setState({ visible: true })
    }
    handleReadCloseClck = (e) => {
      e.preventDefault()
      this.setState({ visible: false })
    }
    render() {
      const { author, text, bigText } = this.props.data
      const { visible } = this.state
      return (
        <div className='article'>
          <p className='data__author'>{author}:</p>
          <p className='data__text'>{text}</p>
          {
            !visible && <a onClick={this.handleReadMoreClck} href="#" className='data__readmore'>Подробнее</a>
          }
          {
            visible && <React.Fragment><p className='data__big-text'>{bigText}</p><a onClick={this.handleReadCloseClck} href="#" className='data__readmore'>Закрыть</a></React.Fragment>

          }
        </div>
      )
    }
  }

  class Data extends React.Component {
        
    renderdata = () => {
      const { data } = this.props
      let dataTemplate = null
      
      if (data.length) {
        dataTemplate = data.map(function(item) {
          return <Article key={item.id} data={item}/>
        })
      } else {
        dataTemplate = <p>К сожалению записей нет</p>
      }
      
      return dataTemplate
    }
    render() {
      const { data } = this.props 
      
      return (
        <div className='data'>
          {this.renderdata()}
          {
            data.length ? <strong className={'data__count'}>Всего Записей: {data.length}</strong> : null
          }
        </div>
      );
    }
  }




  class Add extends React.Component {
        
    state = {
      author: '',
      text: '',
      bigText: '',
      agree: false,
    }
    
    onBtnClickHandler = (e) => {
      e.preventDefault()
      const { author, text, bigText } = this.state
      

      this.props.onAdddata({ 
        id: +new Date(),
        author, 
        text, 
        bigText,          
       })


    }
    handleNameChange = (e) => {
      this.setState ({author: e.currentTarget.value})
    }
    handleTextChange = (e) => {
      this.setState({ text: e.currentTarget.value})
    }
    handleBigTextChange = (e) => {
      this.setState({ bigText: e.currentTarget.value})
    }
    handleCheckboxChange = (e) => {
      this.setState({ agree: e.currentTarget.checked})
    }

    validate = () => {
      const { author, text, bigText, agree } = this.state
      if (author.trim() && text.trim() && agree) {
        return true
      }
      return false
    }
   
     render() {

       const { author, text, bigText, agree } = this.state

       return (
         <React.Fragment>
           <form className="add">
            <div className="blank">
            {author && <div className="blank__item">Автор: {author}</div>}
            {text && <div className="blank__item">Текст: {text}</div>}
            {bigText && <div className="blank__item">Большой текст: {bigText}</div> }        
           </div>


             <input
               onChange={this.handleNameChange}
               type='text'
               className='add__author form-input'
               placeholder='Ваше имя'
               value={author}
             />
             <textarea
               onChange={this.handleTextChange}
               className="add__text form-input"
               placeholder="Текст новости"
               value={text}
               ></textarea>

               <textarea
               onChange={this.handleBigTextChange}
               className="add__text form-input"
               placeholder="Текст новости"
               value={bigText}
               ></textarea>

               <label className='add__checkrule form-input'>
                 <input type='checkbox' onChange={this.handleCheckboxChange} /> я согласен с правилами
               </label>
               <button 
                 className="button-add"
                 onClick={this.onBtnClickHandler}
                 disabled={!this.validate()}>
                 Отправить запись</button>
           </form>
         </React.Fragment>
       )
     }
   }



   class Forms extends React.Component {
    state = {
      data: mydata,
    }

    handleAdddata = (data) => {
      
      const nextdata = [data, ...this.state.data]

      this.setState({ data: nextdata})

    }

    render() {
      return (
        <React.Fragment>
          <Add onAdddata={this.handleAdddata} />
          <h3>Записи</h3>
          <Data data={this.state.data} />
        </React.Fragment>
      )
    }
  }

 



  export default Forms