import React, {Component} from 'react';
import {
  Button,
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardHeaderTitle,
  CardImage,
  Column,
  Columns,
  Container,
  Content,
  Image,
  Media,
  MediaContent,
  Subtitle,
  Title
} from "bloomer";

import './chooseTemplate.css'

class ChooseTemplate extends Component {
  render() {
    return (
      <Container>
        <Content className="containerHeader">
          <p align="center">Choose a template to begin with</p>
        </Content>
        <Columns isCentered>
          <Column className="is-4">
            <Card>
              <CardHeader>
                <CardHeaderTitle className="is-centered">
                  Dense ANN
                </CardHeaderTitle>
              </CardHeader>
              <CardImage>
                <Image isRatio='4:3' src='https://via.placeholder.com/1280x960' />
              </CardImage>
              <CardContent>
                <Media>
                  <MediaContent>
                    <Title isSize={4}>Dense Neural Network</Title>
                    <Subtitle isSize={6}>Contains only Dense Layers</Subtitle>
                  </MediaContent>
                </Media>
                <Content>
                  Feed-forward Artificial Neural Networks with dense layers
                </Content>
              </CardContent>
              <CardFooter>
                <Button isColor='info' href='/build'>Choose</Button>
              </CardFooter>
            </Card>
          </Column>
          <Column className="is-4">
            <Card>
              <CardHeader>
                <CardHeaderTitle className="is-centered">
                  CNN
                </CardHeaderTitle>
              </CardHeader>
              <CardImage>
                <Image isRatio='4:3' src='https://via.placeholder.com/1280x960' />
              </CardImage>
              <CardContent>
                <Media>
                  <MediaContent>
                    <Title isSize={4}>Convolutional Neural Network</Title>
                    <Subtitle isSize={6}>Contains Convolutional Layers</Subtitle>
                  </MediaContent>
                </Media>
                <Content>
                  Convolutional Neural Networks preserve structural information of images and use shared weights as convolution kernels.
                </Content>
              </CardContent>
              <CardFooter>
                <Button isColor='info' href='/build'>Choose</Button>
              </CardFooter>
            </Card>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default ChooseTemplate
