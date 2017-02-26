'use strict';


var my_news = [
  {
    author: 'Саша Печкин',
    text: 'В четверг, четвертого числа...',
				bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
			
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
				bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
			
  },
  {
    author: 'Просто Вася',
    text: 'Считаю, что $ должен стоить 35 рублей!',
				bigText: 'в четыре с четвертью часа четыре чёрненьких чумазеньких чертёнка чертили чёрными чернилами чертёж.'
  }
];

 window.ee = new EventEmitter(); 


var News = React.createClass({displayName: "News",
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  getInitialState: function() {
    return {
      counter: 0
    }
  },
  render: function() {
    var data = this.props.data;
    var newsTemplate;

    if (data.length > 0) {
      newsTemplate = data.map(function(item, index) {
        return (
          React.createElement("div", {key: index}, 
            React.createElement(Article, {data: item})
          )
        )
      })
    } else {
      newsTemplate = React.createElement("p", null, "К сожалению новостей нет")
    }

    return (
      React.createElement("div", {className: "news"}, 
        newsTemplate, 
        React.createElement("strong", {
          className: 'news__count ' + (data.length > 0 ? '':'none'), 
          onClick: this.onTotalNewsClick}, 
          "Всего новостей: ", data.length
        )
      )
    );
  }
});




var Article = React.createClass({displayName: "Article",
	  propTypes: {
    data: React.PropTypes.shape({
      author: React.PropTypes.string.isRequired,
      text: React.PropTypes.string.isRequired,
					 bigText: React.PropTypes.string.isRequired
    })
  },
	
	  getInitialState: function() {
    return {
      visible: false
    };
  },
	
	  readmoreClick: function(e) {
    e.preventDefault();
        this.setState({visible: true}, function() {
      alert('Состояние изменилось');
    });
  },
		
	
  render: function() {
    var author = this.props.data.author,
        text = this.props.data.text,
								bigText = this.props.data.bigText,
								visible = this.state.visible;
			


    return (
      React.createElement("div", {className: "article"}, 
        React.createElement("p", {className: "news__author"}, author, ":"), 
        React.createElement("p", {className: "news__text"}, text), 
								React.createElement("a", {href: "#", onClick: this.readmoreClick, className: 'news__readmore ' + (visible ? 'none': '')}, "Подробнее"), 
        React.createElement("p", {className: 'news__big-text ' + (visible ? '': 'none')}, bigText)
      )
    )
  }
});

// --- добавили test input ---
var Add = React.createClass({displayName: "Add",
  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.author).focus();
  },
  onBtnClickHandler: function(e) {
  e.preventDefault();
  var textEl = ReactDOM.findDOMNode(this.refs.text);

  var author = ReactDOM.findDOMNode(this.refs.author).value;
  var text = textEl.value;

  var item = [{
    author: author,
    text: text,
    bigText: '...'
  }];

  window.ee.emit('News.add', item);

  textEl.value = '';
  this.setState({textIsEmpty: true});
  },
	
	
		  getInitialState: function() {
    return {
    agreeNotChecked: true,
    authorIsEmpty: true,
    textIsEmpty: true
    };
  },
	
	onCheckRuleClick: function(e) {
  this.setState({agreeNotChecked: !this.state.agreeNotChecked});
},
	
onFieldChange: function(fieldName, e) {
  if (e.target.value.trim().length > 0) {
    this.setState({[''+fieldName]:false})
  } else {
    this.setState({[''+fieldName]:true})
  }
},
	
  render: function() {
			
		    var agreeNotChecked = this.state.agreeNotChecked,
        authorIsEmpty = this.state.authorIsEmpty,
        textIsEmpty = this.state.textIsEmpty;	
			
    return (
      React.createElement("form", {className: "add cf"}, 
        React.createElement("input", {
          type: "text", 
          className: "add__author", 
          defaultValue: "", 
          placeholder: "Ваше имя", 
          ref: "author", 
										onChange: this.onFieldChange.bind(this, 'authorIsEmpty')}
        ), 
        React.createElement("textarea", {
          className: "add__text", 
          defaultValue: "", 
          placeholder: "Текст новости", 
          ref: "text", 
										onChange: this.onFieldChange.bind(this, 'textIsEmpty')
        }), 
        React.createElement("label", {className: "add__checkrule"}, 
          React.createElement("input", {type: "checkbox", 
										ref: "checkrule", 
										onChange: this.onCheckRuleClick}), 
										"Я согласен с правилами"
        ), 
        React.createElement("button", {
          className: "add__btn", 
          onClick: this.onBtnClickHandler, 
          ref: "alert_button", 
										disabled: agreeNotChecked || authorIsEmpty || textIsEmpty
										}, 
          "Показать alert"
										
        )
      )
    );
  }
});



var App = React.createClass({displayName: "App",
	
	  getInitialState: function() {
    return {
      news: my_news
    };
  },	
	
componentDidMount: function() {
  var self = this;
  window.ee.addListener('News.add', function(item) {
    var nextNews = item.concat(self.state.news);
    self.setState({news: nextNews});
  });
},
	
componentWillUnmount: function() {
  window.ee.removeListener('News.add');
},
	
	
  render: function() {
    return (
      React.createElement("div", {className: "app"}, 
       React.createElement("h3", null, " Наши новости '=)' "), 
					 	React.createElement(Add, null), 
							React.createElement(News, {data: this.state.news})
      )
    );
  }
});

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);



