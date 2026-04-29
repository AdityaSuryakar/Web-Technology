export class StudentCardComponent {
  name = "Priyanka Ingale";
  course = "AIML";
  imageUrl = "https://via.placeholder.com/150";

  changeImage() {
    this.imageUrl = "https://via.placeholder.com/200";
  }
}