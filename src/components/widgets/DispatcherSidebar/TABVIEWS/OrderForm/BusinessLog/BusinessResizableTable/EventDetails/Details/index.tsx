import { CloseOutlined } from '@ant-design/icons';
import { COLORS } from '@constants/theme';
import { Container, DetailTitle, DetailLabel, DetailWrapper, Header, OkButton, Title, Wrapper } from './styled-components';

interface IProps {
  data: string;
  onClose: () => void;
}

const Details = ({ data, onClose }: IProps) => (
  <Container justify="end">
    <Header align="center">
      <Title>Details</Title>
      <CloseOutlined color={COLORS.GREY_MAIN} onClick={onClose} />
    </Header>
    <Wrapper>
      <DetailTitle>Changed fields</DetailTitle>
      <DetailWrapper>
        <DetailLabel>{data}</DetailLabel>
        {/* <DetailLabel bold>DropOff ETA</DetailLabel> */}
        {/* <DetailLabel bold>8:51 PM 04.27.2013</DetailLabel> */}
        {/* <ArrowRightOutlined color={COLORS.GREY_MAIN} /> */}
        {/* <DetailLabel bold>8:51 PM 04.27.2013</DetailLabel> */}
      </DetailWrapper>
    </Wrapper>
    <OkButton onClick={onClose}>Ok</OkButton>
  </Container>
);

export default Details;
