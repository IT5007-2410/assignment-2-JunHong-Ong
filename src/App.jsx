/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const numRows = 5;
const numColumns = 2;
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: new Date(),
    row: 1, col: 1,
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: new Date(),
    row: 2, col: 2,
  },
];


function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/ }
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>{props.bookingTime.toString()}</td>
    </tr>
  );
}

function Display(props) {
  /*Q3. Write code to render rows of table, reach corresponding to one traveller. Make use of the TravellerRow function that draws one row.*/
  const travellers = props.travellers.map(traveller =>
    <TravellerRow
      key={traveller.id}
      id={traveller.id}
      name={traveller.name}
      phone={traveller.phone}
      bookingTime={traveller.bookingTime}
    />
  );

  return (
    <table className="bordered-table">
      <thead>
        <tr>
          {/*Q3. Below table is just an example. Add more columns based on the traveller attributes you choose.*/}
          <th>ID</th>
          <th>Name</th>
          <th>Phone</th>
          <th>Booking Time</th>
        </tr>
      </thead>
      <tbody>
        {/*Q3. write code to call the JS variable defined at the top of this function to render table rows.*/}
        {travellers}
      </tbody>
    </table>
  );
}

class Add extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    /*Q4. Fetch the passenger details from the add form and call bookTraveller()*/
    const form = document.forms.addTraveller;
    this.props.addFunction(form);
  }

  render() {
    return (
      <form name="addTraveller" onSubmit={this.handleSubmit}>
        {/*Q4. Placeholder to enter passenger details. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <input type="number" name="travellerphone" placeholder="Phone" />
        <button>Add</button>
      </form>
    );
  }
}


class Delete extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    /*Q5. Fetch the passenger details from the deletion form and call deleteTraveller()*/
    const form = document.forms.deleteTraveller;
    this.props.deleteFunction(form.travellername.value);
  }

  render() {
    return (
      <form name="deleteTraveller" onSubmit={this.handleSubmit}>
        {/*Q5. Placeholder form to enter information on which passenger's ticket needs to be deleted. Below code is just an example.*/}
        <input type="text" name="travellername" placeholder="Name" />
        <button>Delete</button>
      </form>
    );
  }
}

class Seat extends React.Component {
  constructor() {
    super();
  }

  render() {
    if (this.props.booked) {
      return <div className="grid-item seat occupied"></div>;
    } else {
      return <div className="grid-item seat empty"></div>;
    }
  }
}

class SeatingArrangement extends React.Component {
  constructor() {
    super();
  }

  render() {
    var elements = [];
    for (var i=0; i < this.props.numRows; i++) {
      var row = [];
      for (var j=0; j < this.props.numColumns; j++) {
        var isBooked = this.props.travellers.some((traveller) => {
          return traveller.row == i+1 && traveller.col == j+1;
        });
        row.push(<Seat key={(i*this.props.numColumns)+j} booked={isBooked} />)
      }
      elements.push(row);
    } 

    return (
      <div className="grid-container">
        {elements}
      </div>
    )
  }
}

class Homepage extends React.Component {
  constructor() {
    super();
  }
  render() {
    return (
      <div>
        {/*Q2. Placeholder for Homepage code that shows free seats visually.*/}
        <SeatingArrangement numRows={numRows} numColumns={numColumns} travellers={this.props.travellers}/>
      </div>);
  }
}
class TicketToRide extends React.Component {
  constructor() {
    super();
    this.state = { travellers: [], selector: 1 };
    this.bookTraveller = this.bookTraveller.bind(this);
    this.deleteTraveller = this.deleteTraveller.bind(this);
  }

  setSelector(value) {
    /*Q2. Function to set the value of component selector variable based on user's button click.*/
    this.setState({ selector: value });
  }
  componentDidMount() {
    this.loadData();
  }

  loadData() {
    setTimeout(() => {
      this.setState({ travellers: initialTravellers });
    }, 500);
  }

  bookTraveller(passenger) {
    /*Q4. Write code to add a passenger to the traveller state variable.*/
    var newTravellers = this.state.travellers;
    newTravellers.push({
      id: 3, name: passenger.travellername.value, phone: passenger.travellerphone.value,
      bookingTime: new Date(),
    });
    this.setState({ travellers: newTravellers });
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    var newTravellers = [];
    this.state.travellers.forEach(element => {
      if (element.name != passenger) { newTravellers.push(element) }
    });
    this.setState({ travellers: newTravellers });
  }
  render() {
    return (
      <div>
        <h1>Ticket To Ride</h1>
        <div>
          {/*Q2. Code for Navigation bar. Use basic buttons to create a nav bar. Use states to manage selection.*/}
          <nav>
            <div>
              <div>
                <ul>
                  <li>
                    <a onClick={() => this.setSelector(1)}>Homepage</a>
                  </li>
                  <li>
                    <a onClick={() => this.setSelector(2)}>Display</a>
                  </li>
                  <li>
                    <a onClick={() => this.setSelector(3)}>Add</a>
                  </li>
                  <li>
                    <a onClick={() => this.setSelector(4)}>Delete</a>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
        <div>
          {/*Only one of the below four divisions is rendered based on the button clicked by the user.*/}
          {/*Q2 and Q6. Code to call Instance that draws Homepage. Homepage shows Visual Representation of free seats.*/}
          {this.state.selector == 1 && <Homepage travellers={this.state.travellers} />}
          {/*Q3. Code to call component that Displays Travellers.*/}
          {this.state.selector == 2 && <Display travellers={this.state.travellers} />}
          {/*Q4. Code to call the component that adds a traveller.*/}
          {this.state.selector == 3 && <Add addFunction={this.bookTraveller} />}
          {/*Q5. Code to call the component that deletes a traveller based on a given attribute.*/}
          {this.state.selector == 4 && <Delete deleteFunction={this.deleteTraveller} />}
        </div>
      </div>
    );
  }
}

const element = <TicketToRide />;

ReactDOM.render(element, document.getElementById('contents'));
