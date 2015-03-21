
var converter = new Showdown.converter();

var ServerList = React.createClass({
  render: function() {

    var serverNodes = this.props.data.map(function (server) {
      return (
        <li>{server.name}: <span className={server.status}>{server.status}</span></li>
      );
    });

    return (
      <div className="streamStatus">
        <ul>
          {serverNodes}
        </ul>
      </div>
    );
  }
});


var StreamStatus = React.createClass({
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadCommentsFromServer();
    setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },
  render: function() {
    return (
      <div className="streamStatus">
        <h1 className="italia">Estado de servidores</h1>
        <ServerList data={this.state.data} />
      </div>
    );
  }
});

React.render(
  <StreamStatus url="streams.json" pollInterval={2000} />,
  document.getElementById('content')
);

