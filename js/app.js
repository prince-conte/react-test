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

// 


var News = React.createClass({displayName: "News",
	
	 propTypes: {
    data: React.PropTypes.array.isRequired
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
        React.createElement("strong", {className: 'news__count ' + (data.length > 0 ? '':'none')}, "Всего новостей: ", data.length)
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


var App = React.createClass({displayName: "App",
  render: function() {
    return (
      React.createElement("div", {className: "app"}, 
       React.createElement("h3", null, " Наши новости '=)' "), 
						React.createElement(News, {data: my_news})
      )
    );
  }
});

ReactDOM.render(
  React.createElement(App, null),
  document.getElementById('root')
);



