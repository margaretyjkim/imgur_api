import React, {
	View, 
	Text, 
	Component, 
	TextInput, 
	StyleSheet, 
	TouchableHighlight, 
	Scrollview
} from 'react-native'

import Realm from 'realm'
import _ from 'lodash'

// Create Realm schema
let realm = new Realm({
	schema: [{name: 'Categories', properties: {name: 'string'}}]
})

// Create Realm for all Categories
let favs = realm.objects('Categories')

class App extends Component { 

	constructor () { 
		super()
		this.state = {
			input: ''
		}
	}

	_closeModal () { 
		this.props.navigator.pop()
	}

	_updateInput (input) {
		this.setState({ input })
	}

// Add item to Realm 
	_addItem () { 
		if (this.state.input === '') return 
			realm.write(() => {
				realm.create('Categories', { name: this.state.input })
			})
			this.setState({ input: ''})
	}

// Delete item from Realm 
	_deleteItem (name) { 
		let itemToDelete = favs.filtered('name = $0', name)
		realm.write(() => {
			realm.delete(itemToDelete)
		})
		this.forceUpdate()
	}

	_viewImages (category) { 
		this.props.navigator.push({
			name: 'ViewImages', 
			passProps: {
				_closeModal: this._closeModal, 
				category
			}
		})
	}

	render () {
		let favorites = _.map(favs, (f, i) => {
			return (
		<View key={i} style={style.favoriteButtonContainer}>
			<TouchableHighlight
			  onPress={() => this._viewImages(f.name)}
			  underlayColor='transparent'
			  style={style.favorite}>
			  <Text style={style.favoriteText}>{f.name}</Text>
			</TouchableHighlight>
			<TouchableHighlight
			  onPress={() => this._deleteItem(f.name)}
			  underlayColor='transparent'
			  style={style.deleteButton}>
			  <Text style={style.deleteText}>&times;</Text>
			</TouchableHighlight>
		</View>)
		})
		return (
			<View style={style.container}>
			  <View style={style.headingContainer}>
			  	<Text style={style.heading}>
			  	  Welcome to Realm Imgur Viewer
			  	</Text>
			  </View>
			  <Scrollview style={style.mainContainer}>
			  	<TextInput
			  	  value={this.state.input}
			  	  onChangeText={(text) => this._updateInput(text)}
			  	  style={style.input}
			  	  placeholder='What Do You Like?' />
			  	<View style={style.buttonContainer}>
			  	  <TouchableHighlight
			  	    underlayColor='#3f62aa'
			  	    style={[ style.button ]}
			  	    onPress={() => this._addItem()}>
			  	    <Text style={style.buttonText}>Add Item</Text>
			  	  </TouchableHighlight>
			  	</View>
			  	<View style={this.favContainer}>
			  	  <Text style={style.favorites}>FAVORITES</Text>
			  	  {favorites}
			  	</View>
			  </ScrollView>
		    </View>		
	  )
	}
}


