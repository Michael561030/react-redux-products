import React, {Component} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {connect} from 'react-redux';
import {requestProduct} from './reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";
import StyledButton from './common/StyledButton'
import Input from './components/Input';
import ProductsList from './components/ProductsList';

//Creating our component
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            input: '',
            category: ' ',
            categoryList: []
        };
    }

    componentDidMount() {

        this.props.loadProducts();

        // save location category from address bar
        let currentLocation = this.props.location.pathname.replace('/', '');
        this.setState({
            category: currentLocation,
        })
    }

    render() {
        let currentLocation = this.props.location.pathname.replace('/', '');
        // this.props.history.push({
        //         pathname: currentLocation,
        //         search: this.state.input
        //     })
        const {products, category} = this.props;
        //filtering list of our items & find unique category therefore displayed them as buttons
        let categoryList = products && products
            .map(product => product.bsr_category.toLowerCase())
            .filter((item, pos, self) => self.indexOf(item) === pos);

        //Adding another one button in the beginning which will display all products
        categoryList && categoryList.unshift('all');

        //Displaying each item as button
        let mappedCategoryList = categoryList && categoryList.map((item, index) => {
            let result;
            console.log(item);
            result = item === '' ?
                <Link to={'/'}>
                    <StyledButton active={currentLocation === 'all' || currentLocation === '' }
                                  item={''}
                                  value={item}
                                  onClick={this.reset.bind(this)}>all</StyledButton>
                </Link> :
                <Link to={item.replace(/\s/g, "")}>
                    <StyledButton active={currentLocation === item.replace(/\s/g, "")}
                                  type="button"
                                  value={item}
                                  onClick={this.handleChange.bind(this)}>
                        {item}
                    </StyledButton>
                </Link>;
            return result

        });

        return (
            //Displaying our layout
            (<Container>
                <Row>
                    <Col xs={5} sm={5} md={4} lg={3}>
                        <div align="center">Filter by category</div>
                        <Col xs={5} sm={8} md={8} lg={8}>
                            <ul>{mappedCategoryList}</ul>
                        </Col>
                    </Col>
                    <Col xs={7} sm={7} md={8} lg={9}>

                        <Input
                            currentLocation={currentLocation}
                            onChangeHandler={this.onChangeHandler.bind(this)}
                            resetField={this.resetField.bind(this)}
                            input={this.state.input}
                        />

                        {
                            (products && currentLocation) &&
                            <ProductsList
                                products={products}
                                category={currentLocation}
                                input={this.state.input}
                            />
                        }
                    </Col>
                </Row>
            </Container>)
        );
    }

    //function which set new state of input field
    onChangeHandler(e) {
        this.setState({
            input: e.target.value
        })
    }

    //function which set new state of category
    handleChange(e) {
        this.setState({
            category: e.target.value.replace(/\s/g, "")
        });
    }

    //function which reset filter & display all items
    reset(e) {
        this.setState({
            category: 'all'
        });
    }

    resetField(e) {
        this.setState({
            input: ''
        })
    }
}

const mapStateToProps = state => ({
    loading: state.loading,
    products: state.products,
    categoryList: state.categoryList
});

//Connect Redux
const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(requestProduct())
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

