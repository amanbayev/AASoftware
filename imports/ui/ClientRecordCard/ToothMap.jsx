import React, { Component } from 'react';

import { Table, Grid } from 'semantic-ui-react';
import ToothInfo from './ToothInfo';

const renderTeeth = row => {
  let list = [];
  let list2 = [];
  for (var i = 0; i < 16; i++) {
    list.push(<ToothInfo key={'tooth' + i} position={i} />);
  }
  for (var i = 16; i < 32; i++) {
    list2.push(<ToothInfo key={'tooth' + i} position={i} />);
  }
  return (
    <Grid style={{ marginLeft: '8px' }}>
      <Grid.Row>{list}</Grid.Row>
      <Grid.Row>{list2}</Grid.Row>
    </Grid>
  );
};

const ToothMap = (adult = true) => {
  if (adult) {
    return renderTeeth();
  } else {
    return (
      <Grid celled="internally">
        <Grid.Row>
          <Grid.Column>55</Grid.Column>
          <Grid.Column>54</Grid.Column>
          <Grid.Column>53</Grid.Column>
          <Grid.Column>52</Grid.Column>
          <Grid.Column>51</Grid.Column>

          <Grid.Column>61</Grid.Column>
          <Grid.Column>62</Grid.Column>
          <Grid.Column>63</Grid.Column>
          <Grid.Column>64</Grid.Column>
          <Grid.Column>65</Grid.Column>
        </Grid.Row>

        <Grid.Row>
          <Grid.Column>85</Grid.Column>
          <Grid.Column>84</Grid.Column>
          <Grid.Column>83</Grid.Column>
          <Grid.Column>82</Grid.Column>
          <Grid.Column>81</Grid.Column>

          <Grid.Column>71</Grid.Column>
          <Grid.Column>72</Grid.Column>
          <Grid.Column>73</Grid.Column>
          <Grid.Column>74</Grid.Column>
          <Grid.Column>75</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
};

export default ToothMap;
