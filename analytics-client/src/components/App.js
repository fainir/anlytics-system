import {Grid} from '@material-ui/core'
import SessionByDay from './SessionByDay'
function App() {
  return (
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="flex-start"
      >
        <div style={{margin: 5, border: '1px solid black', width: '100%', maxWidth: 400, height: 300}}>
          <SessionByDay />
        </div>
        <div style={{margin: 5, width: '400px', height:'300px', border: '1px solid black'}}></div>
        <div style={{margin: 5, width: '300px', height:'250px', border: '1px solid black'}}></div>
        <div style={{margin: 5, width: '300px', height:'200px', border: '1px solid black'}}></div>
        <div style={{margin: 5, width: '300px', height:'200px', border: '1px solid black'}}></div>
        <div style={{margin: 5, width: '400px', height:'300px', border: '1px solid black'}}></div>
        <div style={{margin: 5, width: '300px', height:'250px', border: '1px solid black'}}></div>
        <div style={{margin: 5, width: '300px', height:'200px', border: '1px solid black'}}></div>
  </Grid>
  );
}

export default App;
