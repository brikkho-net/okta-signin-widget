#!/bin/bash
set +x
set -e

TASK=$1

BUILD_TEST_SUITE_ID=bla
LINT_TEST_SUITE_ID=bla
UNIT_TEST_SUITE_ID=bla

function usage() {
  OUTPUTCODE=$1
  echo """
USAGE:
    ./okta-signin-widget-build.sh {TASK}

    Example:
    ./okta-signin-widget-build.sh build

TASKS:
    help              Prints this guide.
    build             Builds the widget.
                      Depends on: clean setversions
    deploy            Publishes widget to NPM after successful build
                      Requires valid Artifactory credentials.
"""
  [ -z $OUTPUTCODE ] && OUTPUTCODE=0
  exit $OUTPUTCODE
}

function build() {
  start_test_suite ${BUILD_TEST_SUITE_ID}
  if npm install && npm run build:prod; then
    echo "Finishing up test suite $BUILD_TEST_SUITE_ID"
    finish_test_suite "build"
  else
    echo "Build failed"
    finish_failed_test_suite "build"
    exit 1
  fi
}

function lint() {
  start_test_suite ${LINT_TEST_SUITE_ID}
  if npm run lint; then
    echo "Finishing up test suite $LINT_TEST_SUITE_ID"
    finish_test_suite "lint"
  else
    echo "Lint failed"
    finish_failed_test_suite "lint"
  fi
}

function unit() {
  start_test_suite ${UNIT_TEST_SUITE_ID}
  if npm test; then
    echo "Finishing up test suite $UNIT_TEST_SUITE_ID"
    finish_test_suite "unit"
  else
    echo "Unit failed"
    finish_failed_test_suite "unit"
  fi
}

function deploy() {
  if [ "$BRANCH" == "master" ]; then
    echo "Publishing master build"
    if publish; then
      echo "Publish Success"
    else
      echo "Publish Faild"
    fi
  fi
}

case $TASK in
  help)
    usage
    ;;
  build)
    build
    lint
    unit
    ;;
  deploy)
    build
    lint
    unit
    deploy
    ;;
  *)
    usage $TASK
    ;;
esac