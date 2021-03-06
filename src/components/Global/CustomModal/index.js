import React from 'react';
import {View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomText} from '../CustomText';

export function CustomModal({
  height,
  width,
  title,
  onModalClose,
  customContent,
}) {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => onModalClose()}>
      <View style={styles.modalContainer}>
        <View style={styles.setModalDimensions(height, width)}>
          <View style={styles.modalHeader}>
            <CustomText type={1} text={title} style={styles.modalTitle} />
            <TouchableOpacity
              onPress={() => onModalClose()}
              style={styles.modalCloseIcon}>
              <AntDesign name="closecircleo" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
          {customContent()}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: '5%',
  },
  setModalDimensions: (height, width) => ({
    height,
    width,
    backgroundColor: '#222225',
    borderRadius: 5,
    padding: 15,
    paddingBottom: 20,
    display: 'flex',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  }),
  modalHeader: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  modalTitle: {
    fontSize: 16,
    marginLeft: 'auto',
    fontWeight: 'bold',
  },
  modalCloseIcon: {
    marginLeft: 'auto',
  },
});
