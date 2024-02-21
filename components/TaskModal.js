import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {useDispatch, useSelector} from 'react-redux';
import {updateTaskDescription, uploadImage} from '../redux/actions/todoActions';
import {formatDistanceToNow} from 'date-fns';
import ImagePicker from 'react-native-image-crop-picker';
import ImageModal from 'react-native-image-modal';

const TaskModal = ({
  visible,
  closeModal,
  task,
  titleId,
  descriptionId,
  updateDescription,
  shouldCloseModal,
}) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.auth.currentUser);

  const {
    id,
    text = 'No Task Selected',
    description,
    updatedAt,
    imageUrl,
  } = task || {};
  const [updatedDescription, setUpdatedDescription] = useState(
    description || '',
  );
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    setUpdatedDescription(description || '');
    setImageUri(imageUrl);
  }, [description, imageUrl]);

  const handleUpdateDescription = async () => {
    if (id) {
      await dispatch(
        updateTaskDescription(
          currentUser?.email,
          id,
          updatedDescription,
          imageUri,
        ),
      );
      if (imageUri) {
        await dispatch(uploadImage(currentUser?.email, id, imageUri));
      }
      closeModal();
    }
  };

  const handleImagePick = async () => {
    try {
      const image = await ImagePicker.openPicker({
        width: 400,
        height: 400,
        cropping: true,
      });

      if (!image) {
        return;
      }

      const imageUrl = image.path;
      setImageUri(imageUrl);
      dispatch(
        updateTaskDescription(
          currentUser?.email,
          id,
          updatedDescription,
          imageUrl,
        ),
      );
    } catch (error) {
      console.error('Error picking image:', error);
    }
  };

  const renderUpdateInfo = () => {
    if (updatedAt) {
      const distanceToNow = formatDistanceToNow(new Date(updatedAt), {
        addSuffix: true,
      });
      return `Updated ${distanceToNow}`;
    }
    return null;
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle} testID={titleId}>
              {text}
            </Text>
            <Text style={styles.updateInfo}>{renderUpdateInfo()}</Text>
          </View>
          <TextInput
            style={styles.descriptionInput}
            multiline={true}
            placeholder="Add description..."
            placeholderTextColor="#674188"
            value={updatedDescription}
            onChangeText={text => setUpdatedDescription(text)}
            testID={descriptionId}
          />
          {imageUri && (
            <View style={styles.imageContainer}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: 'bold',
                  marginBottom: 10,
                  color: '#674188',
                }}>
                Attatchments
              </Text>
              <ImageModal
                source={{uri: imageUri}}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          )}
          <View style={styles.iconRow}>
            <Icon
              name="image"
              type="entypo"
              size={30}
              color="#674188"
              style={styles.icon}
              onPress={handleImagePick}
            />
          </View>
          <TouchableOpacity
            style={styles.updateButton}
            onPress={handleUpdateDescription}>
            <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Text style={styles.buttonCloseText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'left',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#674188',
  },
  updateInfo: {
    fontSize: 14,
    color: 'black',
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'left',
    alignItems: 'left',
    width: '100%',
    marginBottom: 10,
  },
  icon: {
    marginRight: 15,
  },
  updateButton: {
    backgroundColor: '#674188',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    width: 350,
    alignItems: 'center',
  },
  closeButton: {
    backgroundColor: '#FFFBF5',
    padding: 10,
    borderRadius: 15,
    marginVertical: 5,
    color: 'black',
    width: 350,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#674188',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonCloseText: {
    color: '#674188',
    fontSize: 16,
  },
  descriptionInput: {
    height: 300,
    width: 350,
    borderColor: '#674188',
    borderWidth: 2,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    fontFamily: 'DaysOne-Regular',
  },
  imageContainer: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 25,
  },
});

export default TaskModal;
