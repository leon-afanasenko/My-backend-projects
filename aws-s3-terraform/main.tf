resource "aws_s3_bucket" "my_bucket" {
  bucket = var.bucket_name

  tags = {
    name        = var.bucket_name
    environment = "development"
  }
}