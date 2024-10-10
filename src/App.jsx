/*Q1. JS Variable needs to be created here. Below variable is just an example. Try to add more attributes.*/
const numRows = 5;
const numColumns = 2;
const initialTravellers = [
  {
    id: 1, name: 'Jack', phone: 88885555,
    bookingTime: '2024-10-09',
    row: 1, col: 1,
  },
  {
    id: 2, name: 'Rose', phone: 88884444,
    bookingTime: '2024-10-01',
    row: 2, col: 2,
  },
];
var maxId = initialTravellers.length;
var allSeats = new Set();
for (var i=0; i < numRows; i++) {
  for (var j=0; j < numColumns; j++) {
    allSeats.add(`Row: ${i+1}, Col: ${j+1}`)
  }
};

function TravellerRow(props) {
  {/*Q3. Placeholder to initialize local variable based on traveller prop.*/ }
  return (
    <tr>
      {/*Q3. Placeholder for rendering one row of a table with required traveller attribute values.*/}
      <td>{props.id}</td>
      <td>{props.name}</td>
      <td>{props.phone}</td>
      <td>{props.bookingTime}</td>
      <td>{props.seatRow}</td>
      <td>{props.seatColumn}</td>
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
      seatRow={traveller.row}
      seatColumn={traveller.col}
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
          <th>Seat Row</th>
          <th>Seat Column</th>
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
        <label htmlFor="travellername">Full Name: </label>
        <input type="text" id="travellername" name="travellername" placeholder="Name" required />
        <br />
        <label htmlFor="travellerphone">Phone Number: </label>
        <input type="number" id="travellerphone" name="travellerphone" placeholder="Phone" min="80000000" max="99999999" required />
        <br />
        <label htmlFor="bookingtime">Booking Date: </label>
        <input type="date" id="bookingtime" name="bookingtime" required />
        <br />
        <label htmlFor="seatrow">Seat Row: </label>
        <input type="number" id="seatrow" name="seatrow" min="1" max="5" required />
        <br />
        <label htmlFor="seatcol">Seat Column: </label>
        <input type="number" id="seatcol" name="seatcol" min="1" max="2" required />
        <br />
        <button>Add Traveller</button>
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

class DisplayFreeSeats extends React.Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>Number of empty seats: {(numRows*numColumns) - this.props.numTravellers}</div>
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
        <DisplayFreeSeats numTravellers={this.props.travellers.length}/>
      </div>
    )
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
    var seatIsBooked = false;
    var bookedSeats = new Set();
    this.state.travellers.forEach(traveller => {
      if ((traveller.row == passenger.seatrow.value) && (traveller.col == passenger.seatcol.value)) {
        seatIsBooked = true;
      }
      bookedSeats.add(`Row: ${traveller.row}, Col: ${traveller.col}`)
    });

     if (seatIsBooked) {
      var alertMsg = "Selected seat is already booked. Please choose a different seat.\nAvailable seats:\n"
      for (var seat of allSeats.difference(bookedSeats)) {
        alertMsg = alertMsg + ` ${seat}\n`
      }
      alert(alertMsg);
    } else {
      newTravellers.push({
        id: maxId+1,
        name: passenger.travellername.value,
        phone: passenger.travellerphone.value,
        bookingTime: passenger.bookingtime.value,
        row: passenger.seatrow.value,
        col: passenger.seatcol.value,
      });
      this.setState({ travellers: newTravellers });
      maxId++;
      alert("Traveller added successfully.")
    }
  }

  deleteTraveller(passenger) {
    /*Q5. Write code to delete a passenger from the traveller state variable.*/
    var newTravellers = [];
    var foundTraveller = false;
    this.state.travellers.forEach(element => {
      if (element.name != passenger) {
        newTravellers.push(element);
      } else {
        foundTraveller = true;
      }
    });
    this.setState({ travellers: newTravellers });

    if (foundTraveller) {
      alert(`Traveller ${passenger} deleted successfully.`);
    } else {
      alert(`Traveller with name ${passenger} cannot be found.`)
    }
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
