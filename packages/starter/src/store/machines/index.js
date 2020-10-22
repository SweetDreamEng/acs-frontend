const module = {
  state: {
    data: [
      {
        id: 1,
        parameters: [],
        status: 'Warning',
        machinename: 'BD Batch Blender',
        capacity: 89,
        consumption: '80 Watts',
        factory: '30 Elm Street, NY',
        department: 'Division 1',
        notes: []
      },
      {
        id: 2,
        parameters: [],
        status: 'Normal',
        machinename: 'Accumeter Ovation Continuous',
        capacity: 30,
        consumption: '30 Watts',
        factory: '45 Main street, FL',
        department: 'Division 2',
        notes: []
      },
      {
        id: 3,
        parameters: [],
        status: 'Normal',
        machinename: 'GH Gravimetric Extrusion Control',
        capacity: 57,
        consumption: '20 Watts',
        factory: '50 Gracy Street, TX',
        department: 'Division 3',
        notes: []
      },
      {
        id: 4,
        parameters: [],
        status: 'Alarm',
        machinename: 'GH-F Gravimetric Additive',
        capacity: 99,
        consumption: '90 Watts',
        factory: '44 Main Street, GA',
        department: 'Division 4',
        notes: []
      },
      {
        id: 5,
        parameters: [],
        status: 'Normal',
        machinename: 'VTC Plus Conveying',
        capacity: 32,
        consumption: '10 Watts',
        factory: '33 One Drive, MA',
        department: 'Division 1',
        notes: []
      },
      {
        id: 6,
        parameters: [],
        status: 'Normal',
        machinename: 'NGX',
        capacity: 27,
        consumption: '10 Watts',
        factory: '29 Georgia Ave, CA',
        department: 'Division 4',
        notes: []
      },
      {
        id: 7,
        parameters: [],
        status: 'Normal',
        machinename: 'NGX Nomad',
        capacity: 38,
        consumption: '40 Watts',
        factory: '746 Macon, CO',
        department: 'Division 5',
        notes: []
      },
      {
        id: 8,
        parameters: [],
        status: 'Warning',
        machinename: 'Truetemp',
        capacity: 74,
        consumption: '20 Watts',
        factory: '1 Cantance Street, UT',
        department: 'Division 1',
        notes: []
      },
      {
        id: 9,
        parameters: [],
        status: 'Not',
        machinename: 'GP & HE Central',
        capacity: '',
        consumption: 'OFF',
        factory: '45 Spring Street, NY',
        department: 'Division 5',
        notes: []
      },
      {
        id: 10,
        parameters: [],
        status: 'Normal',
        machinename: 'T50 Central',
        capacity: '52',
        consumption: '30 Watts',
        factory: '69 Borden Rd, IL',
        department: 'Division 3',
        notes: []
      }
    ],
    selectedId: 0
  },

  actions: {
    selectMachine({
      commit
    }, id) {
      commit('selectData', id)
    },
    updateSelections({
      commit
    }, selections) {
      commit('updateSelections', selections)
    },
    addProductNote({
      commit
    }, note) {
      commit('addProductNote', note)
    }
  },

  mutations: {
    selectData: (state, id) => {
      state.selectedId = parseInt(id)
    },
    updateSelections: (state, selections) => {
      state.data.forEach( (_data) => {
        if (_data.id === state.selectedId) {
          _data.selections = selections
        }
      })
    },
    addProductNote: (state, note) => {
      state.data.forEach( (_data) => {
        if (_data.id === state.selectedId) {
          const currentTime = new Date()

          _data.notes.push({
            text: note,
            time: currentTime
          })
        }
      })
    }
  },

  getters: {
    selectedMachine: (state) => {
      if (state.selectedId) {
        const _machine = state.data.find((machine) => machine.id === state.selectedId)
        
        return _machine
      }
    }
  }
}

export default module