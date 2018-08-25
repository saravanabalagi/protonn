import React, { Component } from 'react';
import {
  Card,
  CardContent,
  CardHeader, CardHeaderIcon,
  CardHeaderTitle,
  CardImage,
  Column, Columns, Container, Content, Icon, Image,
  Media,
  MediaContent,
  MediaLeft, Subtitle, Title
} from "bloomer";

class ChooseTemplate extends Component {
  render() {
    return (
      <Container>
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
            </Card>
          </Column>
        </Columns>
      </Container>
    );
  }
}

export default ChooseTemplate
